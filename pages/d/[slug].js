import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Head from 'next/head'
import SyntaxHighlighter from 'react-syntax-highlighter'
import axios from 'axios'
import {
  Container,
  Badge,
  Button,
  ButtonGroup,
  Modal,
  Form
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClone,
  faShare,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { setAlert } from '../../actions/alert'
import Router from 'next/router'

const langMap = {
  ahk: 'autohotkey',
  asm: 'asm6502',
  asp: 'aspnet',
  awk: 'text',
  bat: 'batch',
  c: 'c',
  cpp: 'cpp',
  cs: 'csp',
  css: 'css',
  cxx: 'cpp',
  dpj: 'text',
  h: 'c',
  hpp: 'cpp',
  html: 'html',
  hxx: 'cpp',
  java: 'java',
  js: 'javascript',
  jsp: 'aspnet',
  json: 'json',
  jsx: 'jsx',
  mk: 'markdown',
  php: 'php',
  pl: 'perl',
  pm: 'text',
  py: 'python',
  sh: 'shellSession',
  ts: 'typescript',
  vue: 'html',
  other: 'text'
}

const Drop = ({ drop, theme, auth }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'

  const [showModal, setShowModal] = useState()
  const [formData, setFormData] = useState({ title: '', code: '' })

  const editForm = useRef()

  const copy = (text) => {
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        navigator.clipboard.writeText(text)
      }
    })
  }

  const editHandler = async (e) => {
    e.preventDefault()
    setShowModal(null)
    let editData = { ...formData }
    editData.title = formData.title === '' ? drop.title : formData.title
    editData.code = formData.code === '' ? drop.code : formData.code
    try {
      const { data } = await axios.put(
        `https://codedrop-server.herokuapp.com/drops/${drop.slug}`,
        editData
      )
      Router.push(`/d/${data.slug}`)
    } catch (err) {
      console.log(err.response)
      setAlert('Failed to edit Drop', 'danger')
    }
  }

  const deleteDrop = async () => {
    try {
      const res = await axios.delete(
        `https://codedrop-server.herokuapp.com/drops/${drop.slug}`
      )
      Router.push('/')
    } catch (err) {
      console.log(err.response)
      setAlert('Failed to delete Drop', 'danger')
    }
  }

  return (
    <>
      <Head>
        <title>
          {drop.title} ({drop.language}) - Codedrop
        </title>
        <meta
          name='description'
          content={`${drop.title}, written in ${drop.language}. View the code on Codedrop`}></meta>
      </Head>
      <div className={`bg-${theme}`}>
        <Container>
          <h1 className={`text-${oppositeTheme}`}>
            {drop.title}{' '}
            <Badge style={{ background: '#007bff' }}>
              {drop.language !== 'other' && drop.language.toUpperCase()}
            </Badge>
          </h1>
          <ButtonGroup aria-label='Basic actions' className='mb-3'>
            <Button variant='secondary'>
              <FontAwesomeIcon icon={faClone} onClick={() => copy(drop.code)} />
            </Button>
            <Button variant='secondary'>
              <FontAwesomeIcon
                icon={faShare}
                onClick={() => setShowModal('share')}
              />
            </Button>
            {auth.isAuthenticated &&
              auth.user.username === drop.author.username && (
                <Button variant='secondary'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => setShowModal('edit')}
                  />
                </Button>
              )}
            {auth.isAuthenticated &&
              auth.user.username === drop.author.username && (
                <Button variant='secondary'>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => setShowModal('delete')}
                  />
                </Button>
              )}
          </ButtonGroup>
          <SyntaxHighlighter language={langMap[drop.language]}>
            {drop.code}
          </SyntaxHighlighter>
        </Container>
      </div>
      <Modal show={showModal === 'share'} onHide={() => setShowModal(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Drop</Modal.Title>
        </Modal.Header>
        <Modal.Body>https://codedrop.pro/d/{drop.slug}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal === 'delete'} onHide={() => setShowModal(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Share Drop</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {drop.title}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(null)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteDrop}>
            Delete Drop
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal === 'edit'} onHide={() => setShowModal(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Drop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={editForm} onSubmit={(e) => editHandler(e)}>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type='text'
                placeholder={drop.title}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Code:</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                as='textarea'
                rows={3}
                placeholder={drop.code}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(null)}>
            Close
          </Button>
          <Button variant='primary' onClick={(e) => editHandler(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `https://codedrop-server.herokuapp.com/drops/${context.params.slug}`
  )
  const drop = await res.data

  return {
    props: {
      drop
    }
  }
}

Drop.propTypes = {
  drop: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  auth: state.auth
})

export default connect(mapStateToProps)(Drop)

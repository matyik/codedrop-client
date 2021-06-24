import { useState } from 'react'
import Head from 'next/head'
import { Form, Container, Dropdown, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Router from 'next/router'

const LANGS = [
  'ahk',
  'asm',
  'asp',
  'awk',
  'bat',
  'c',
  'cpp',
  'cs',
  'css',
  'cxx',
  'dpj',
  'h',
  'hpp',
  'html',
  'hxx',
  'java',
  'js',
  'jsp',
  'json',
  'jsx',
  'mk',
  'php',
  'pl',
  'pm',
  'py',
  'sh',
  'ts',
  'vue',
  'other'
]

const New = ({ isAuthenticated, theme }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'

  const [formData, setFormData] = useState({
    title: '',
    language: '',
    code: '',
    expirationDate: null,
    expirationTime: null,
    maxclicks: null
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    let fData = formData
    fData.code = fData.code === '' ? 'other' : fData.code
    fData.expiration =
      fData.expirationDate &&
      Date.parse(`${fData.expirationDate} ${fData.expirationTime}`)
    try {
      const res = await axios.post(
        'https://codedrop-server.herokuapp.com/drops',
        fData
      )
      const data = await res.data
      Router.push(`/d/${data.slug}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <>
      <Head>
        <title>New Drop - Codedrop</title>
        <meta name='description' content='Create a new drop on Codedrop'></meta>
      </Head>
      <div className={`bg-${theme}`}>
        <Container>
          <h1 className={`text-${oppositeTheme}`}>New Drop</h1>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='mb-3'>
              <Form.Label className={`text-${oppositeTheme}`}>Title</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type='text'
                placeholder='Untitled Drop'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={`text-${oppositeTheme}`}>
                Select Language:
              </Form.Label>
              <Dropdown variant={oppositeTheme} id='dropdown-basic'>
                <Dropdown.Toggle id='dropdown-basic'>
                  {formData.language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {LANGS.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() =>
                        setFormData({ ...formData, language: item })
                      }>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className={`text-${oppositeTheme}`}>
                Paste Code:
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                as='textarea'
                rows={3}
                required
              />
            </Form.Group>
            <Form.Text className={`text-${oppositeTheme}`}>Optional:</Form.Text>
            <Row
              style={{
                borderTop: '1px solid #007bff',
                marginTop: '0.5rem',
                paddingTop: '0.5rem'
              }}>
              <Col md>
                <Form.Group className='mb-3'>
                  <Form.Label className={`text-${oppositeTheme}`}>
                    Max. Views
                  </Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({ ...formData, maxclicks: e.target.value })
                    }
                    type='number'
                    placeholder='No Limit'
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className='mb-3'>
                  <Form.Label className={`text-${oppositeTheme}`}>
                    Expiration
                  </Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value
                      })
                    }
                    type='date'
                    className='mb-2'
                  />
                  <Form.Control
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationTime: e.target.value
                      })
                    }
                    type='time'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type='submit'>Create Drop</Button>
          </Form>
        </Container>
      </div>
    </>
  )
}

New.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.theme
})

export default connect(mapStateToProps)(New)

import { useState } from 'react'
import { login } from '../actions/auth'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { Form, Button, Container, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const signin = ({ login, isAuthenticated, theme }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [seePwd, setSeePwd] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    login(formData)
  }

  // Redirect if logged in
  if (isAuthenticated) document.location = 'https://codedrop.pro'

  return (
    <>
      <Head>
        <title>Sign In - Codedrop</title>
        <meta
          name='description'
          content='Log back in to your Codedrop account'></meta>
      </Head>
      <div className={`bg-${theme}`}>
        <Container>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label className={`text-${oppositeTheme}`}>
                Email address or username
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email or username'
                required
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label className={`text-${oppositeTheme}`}>
                Password
              </Form.Label>
              <InputGroup className='mb-2'>
                {seePwd ? (
                  <Form.Control
                    type='text'
                    required
                    placeholder='Password'
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                ) : (
                  <Form.Control
                    type='password'
                    required
                    placeholder='Password'
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                )}
                <InputGroup.Text onClick={() => setSeePwd(!seePwd)}>
                  {seePwd ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  )
}

signin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.theme
})

export default connect(mapStateToProps, { login })(signin)

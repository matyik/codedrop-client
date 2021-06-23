import { useState } from 'react'
import axios from 'axios'
import { register } from '../actions/auth'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { Form, Button, Container, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const signup = ({ register, isAuthenticated, theme }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [seePwd, setSeePwd] = useState(false)
  const [usernameTaken, setUsernameTaken] = useState(null)

  const usernameHandler = async (e) => {
    setFormData({ ...formData, username: e.target.value })
    if (e.target.value.length > 2) {
      try {
        const res = await axios.get(
          `http://api.codedrop.pro/users?username=${e.target.value}`
        )
        if (res.data.length === 1) {
          setUsernameTaken('true')
        } else {
          setUsernameTaken('false')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      setUsernameTaken(null)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    register(formData)
  }

  // Redirect if logged in
  if (isAuthenticated) document.location = 'https://codedrop.pro'

  return (
    <>
      <Head>
        <title>Sign Up - Codedrop</title>
        <meta
          name='description'
          content='Create a Codedrop account and start sharing code'></meta>
      </Head>
      <div className={`bg-${theme}`}>
        <Container>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='mb-3' controlId='formBasicUsername'>
              <Form.Label className={`text-${oppositeTheme}`}>
                Username
              </Form.Label>
              <Form.Control
                type='text'
                required
                minLength='3'
                placeholder='Enter Username'
                onChange={(e) => usernameHandler(e)}
                isInvalid={usernameTaken === 'true'}
                isValid={usernameTaken === 'false'}
              />
              {usernameTaken === 'true' ? (
                <Form.Control.Feedback type='invalid'>
                  Username is taken.
                </Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback type='valid'>
                  Username is available!
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label className={`text-${oppositeTheme}`}>
                Email address
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Form.Text className='text-muted'>
                Your email address will never be shared with anyone else.
              </Form.Text>
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

signup.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.theme
})

export default connect(mapStateToProps, { register })(signup)

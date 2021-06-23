import React from 'react'
import Link from 'next/link'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { toggleTheme } from '../actions/theme'
import PropTypes from 'prop-types'

const Navmenu = ({ logout, isAuthenticated, toggleTheme, theme }) => {
  return (
    <Navbar bg={theme} variant={theme} expand='md'>
      <Link href='/'>
        <Navbar.Brand href='javascript:void(0)'>Codedrop</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {isAuthenticated ? (
            <Nav.Link onClick={logout}>Log out</Nav.Link>
          ) : (
            <>
              <Link href='/signup'>
                <Nav.Link href='javascript:void(0)'>Sign up</Nav.Link>
              </Link>
              <Link href='/signin'>
                <Nav.Link href='javascript:void(0)'>Sign in</Nav.Link>
              </Link>
            </>
          )}
        </Nav>
        <Form.Check
          onClick={(e) => toggleTheme(e.target.checked)}
          type='switch'
          id='custom-switch'
          label='Dark Mode'
          checked={theme === 'dark'}
          className={theme === 'dark' && 'text-muted'}
        />
        <Link href='/new'>
          <Button className='ml-3' variant='outline-primary'>
            Create Drop
          </Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

Navmenu.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.theme
})

export default connect(mapStateToProps, { logout, toggleTheme })(Navmenu)

import Head from 'next/head'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Home = ({ theme, isAuthenticated }) => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
  return (
    <>
      <Head>
        <title>Codedrop</title>
        <meta
          name='description'
          content='Quickly share your code for free via copy and paste'></meta>
      </Head>
      <div className={`bg-${theme}`}>
        <Container className='text-center' style={{ paddingBottom: '1rem' }}>
          <h1 className={`text-${oppositeTheme}`}>Codedrop</h1>
          <p className={`text-${oppositeTheme}`}>
            Quickly share your code for free
          </p>

          <Link href={isAuthenticated ? '/new' : '/signup'}>
            <Button>{isAuthenticated ? 'Create Drop' : 'Sign Up'}</Button>
          </Link>
        </Container>
      </div>
    </>
  )
}

Home.propTypes = {
  theme: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home)

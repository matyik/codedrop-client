import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch, getState) => {
  if (getState().auth.token) {
    setAuthToken(getState().auth.token)
  }

  try {
    const res = await axios.get(
      'https://codedrop-server.herokuapp.com/users/me'
    )
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

// Register User
export const register =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = { username, email, password }

    try {
      const res = await axios.post(
        // `${process.env.API_URL}/auth/local/register`,
        `https://codedrop-server.herokuapp.com/auth/local/register`,
        body,
        config
      )
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
      // dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.data
        ? err.response.data.data[0].messages
        : ['Unknown Error']
      console.log(errors)
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
      }
      dispatch({ type: REGISTER_FAIL })
    }
  }

// Login User
export const login =
  ({ identifier, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = { identifier, password }

    try {
      const res = await axios.post(
        // `${process.env.API_URL}/auth/local`,
        `https://codedrop-server.herokuapp.com/auth/local`,
        body,
        config
      )
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
      // dispatch(loadUser())
    } catch (err) {
      const errors = err.response.data.data
        ? err.response.data.data[0].messages
        : ['Unknown Error']
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
      }
      dispatch({ type: LOGIN_FAIL })
    }
  }

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

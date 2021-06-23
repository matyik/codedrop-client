import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import theme from './theme'

export default combineReducers({ alert, auth, theme })

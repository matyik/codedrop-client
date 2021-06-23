import { TOGGLE_THEME } from './types'

export const toggleTheme = (theme) => (dispatch) => {
  dispatch({ type: TOGGLE_THEME, payload: theme ? 'dark' : 'light' })
}

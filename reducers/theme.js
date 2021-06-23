import { TOGGLE_THEME } from '../actions/types'

const initialState = { theme: 'dark' }

export default function (state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case TOGGLE_THEME:
      return { theme: payload }
    default:
      return state
  }
}

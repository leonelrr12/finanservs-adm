import {
  SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR
} from '../actions/user'

const initialState = {
  isLoading: false,
  data: {},
  error: {}
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
        data: {}
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        isLoading: false,
        data: {}
      }
    default:
      return state
  }
}

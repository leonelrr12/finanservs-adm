import axios from "axios";
import apiConfig from '../../config/api'

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

const URL_API = apiConfig.domain

const signInStart = () => ({
  type: SIGN_IN_START,
})

const signInSuccess = (payload) => ({
  type: SIGN_IN_SUCCESS,
  payload,
})

const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  error,
})

export const singIn = (data) => async (dispatch) => {
  try {
    dispatch(signInStart())
    const res = await axios.post(URL_API + '/api/login/', data)
    dispatch(signInSuccess(res.data))
  } catch (error) {
    dispatch(signInError(error))
  }
}
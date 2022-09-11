import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiConfig from '../../config/api'

const initialState = {
  isLoading: false,
  error: {},
  data: "",
}

const URL_API = apiConfig.domain

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart(state) {
      state.isLoading = true
    },
    signInSuccess(state, action) {
      state.isLoading = false
      state.data = action.payload
    },
    signInError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    logOut: (state) => {
      state.data = "";
    },
  }
})

export const { signInStart, signInSuccess, signInError, logOut } = userSlice.actions

export const singIn = (data) => async (dispatch) => {
  try {
    dispatch(signInStart())
    const res = await axios.post(URL_API + '/api/login/', data)
    dispatch(signInSuccess(res.data))
  } catch (error) {
    dispatch(signInError(error))
  }
}

export const isLoading = state => state.userSlice.isLoading
export const userData = state => state.userSlice.data
export const userError = state => state.userSlice.error

export default userSlice.reducer
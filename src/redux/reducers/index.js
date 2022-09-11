import { combineReducers } from "@reduxjs/toolkit"

import { userReducer } from "./user"
import userSlice from '../slices/user'

export default combineReducers({
    userReducer,
    userSlice
})
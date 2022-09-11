import { combineReducers } from "@reduxjs/toolkit"
import userSlice from '../slices/user'

// export default combineReducers({
//     user: userSlice
// })

export const reducer = combineReducers({
    userSlice
})


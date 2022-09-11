// import {
//     createAsyncThunk,
//     createSlice
// } from "@reduxjs/toolkit";
// import Axios from 'axios'
// import apiConfig from '../config/api'

// export const signUp = createAsyncThunk('user/signUp', async ({
//     credentials
// }) => {
//     const result = await Axios.post(`${apiConfig.domain}/users`, {
//         user: credentials
//     })

//     return result.data.user
// })

// export const signIn = createAsyncThunk('user/signIn', async ({
//     credentials
// }) => {
//     const result = await Axios.post(`${apiConfig.domain}/api/login/signin`, {
//         user: credentials
//     })

//     const { user, error } = result.data
//     return user ? user : error
// })

// let userSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: "",
//         status: "",
//     },
//     reducers: {
//         logOut: (state) => {
//             state.status = "";
//             state.user = "";
//         },
//     },
//     extraReducers: {
//         [signUp.pending]: (state, action) => {
//             state.status = 'loading'
//         },
//         [signUp.fulfilled]: (state, action) => {
//             state.user = action.payload
//             state.status = 'success'
//         },
//         [signUp.rejected]: (state, action) => {
//             state.status = 'failed'
//         },
//         [signIn.pending]: (state, action) => {
//             state.status = 'loading'
//         },
//         [signIn.fulfilled]: (state, action) => {
//             state.user = action.payload
//             state.status = 'success'
//         },
//         [signIn.rejected]: (state, action) => {
//             state.status = 'failed'
//         },
//     }
// });

// export const {
//     logOut
// } = userSlice.actions;

// export default userSlice.reducer;
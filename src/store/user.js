import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import Axios from 'axios'
import apiConfig from '../config/api'

export const signUp = createAsyncThunk('user/signUp', async ({
    credentials
}) => {
    // ASync operation
    const result = await Axios.post(`${apiConfig.domain}/users`, {
        user: credentials
    })
    console.log(result)

    return result.data.user
})

export const signIn = createAsyncThunk('user/signIn', async ({
    credentials
}) => {
    // ASync operation
    const result = await Axios.post(`${apiConfig.domain}/api/login/signin`, {
        user: credentials
    })
    console.log(result)

    const { user, error } = result.data
    return user ? user : error
})


let userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: "",
    },
    reducers: {
        logOut: (state) => {
            state.status = "";
            state.user = null;
        },
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signUp.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'success'
        },
        [signUp.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [signIn.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signIn.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'success'
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
        },
    }
});

export const {
    logOut
} = userSlice.actions;

export default userSlice.reducer;
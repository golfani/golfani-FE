import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginMember} from "src/apis/Member";

export interface IUser {
    userId : string
    accessToken : string
    refreshToken : string
}

interface ILoginState  {
    loading : boolean
    isLoggedIn : boolean
    error : LoginError | null
}

type LoginError = {
    error : string
}

const initialState : ILoginState = {
    loading : false,
    isLoggedIn : false,
    error : null
}

export const loginSlice = createSlice({
    name : 'login',
    initialState : initialState,
    reducers : {
        loginAsync(state : ILoginState , action : PayloadAction<LoginMember>) {
            state.loading = true;
            state.isLoggedIn = false;
            state.error = null;
        },
        loginAsyncSuccess(state : ILoginState) {
            state.loading = false;
            state.isLoggedIn = true;
            state.error = null;
        },
        loginAsyncError(state : ILoginState, action : PayloadAction<LoginError>) {
            state.loading =false;
            state.isLoggedIn = false;
            state.error = action.payload;
        }
    }
})

export default loginSlice.reducer;
export const {loginAsync, loginAsyncSuccess, loginAsyncError} = loginSlice.actions;

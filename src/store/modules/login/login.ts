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
    user : IUser | null
    error : LoginError | null
}

type LoginError = {
    error : string
}

const initialState : ILoginState = {
    loading : false,
    isLoggedIn : false,
    user : null,
    error : null
}

export const loginSlice = createSlice({
    name : 'login',
    initialState : initialState,
    reducers : {
        loginAsync(state : ILoginState , action : PayloadAction<LoginMember>) {
            state.loading = true;
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
        loginAsyncSuccess(state : ILoginState, action : PayloadAction<IUser>) {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        },
        loginAsyncError(state : ILoginState, action : PayloadAction<LoginError>) {
            state.loading =false;
            state.user = null;
            state.error = action.payload;
        }
    }
})

export default loginSlice.reducer;
export const {loginAsync, loginAsyncSuccess, loginAsyncError} = loginSlice.actions;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginMember} from "src/apis/Member";

type LoginState = {
    loading : boolean
    isLoggedIn : boolean
    user : string | null
    error : LoginError | null
}

type LoginError = {
    error : string
}

const initialState : LoginState = {
    loading : false,
    isLoggedIn : false,
    user : null,
    error : null
}

export const loginSlice = createSlice({
    name : 'login',
    initialState : initialState,
    reducers : {
        loginAsync(state : LoginState , action : PayloadAction<LoginMember>) {
            state.loading = true;
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
        },
        loginAsyncSuccess(state : LoginState, action : PayloadAction<string>) {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
            localStorage.setItem('logged', action.payload);
        },
        loginAsyncError(state : LoginState, action : PayloadAction<LoginError>) {
            state.loading =false;
            state.user = null;
            state.error = action.payload;
        }
    }
})

export default loginSlice.reducer;
export const {loginAsync, loginAsyncSuccess, loginAsyncError} = loginSlice.actions;

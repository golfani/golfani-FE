import {PayloadAction} from "@reduxjs/toolkit";
import {login, LoginMember} from "src/apis/Member";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {loginAsync, loginAsyncSuccess, loginAsyncError, IUser} from './login';
import axios from "axios";
import {setCookie} from "src/utils/cookieUtil";

function* handleLoginSaga(action : PayloadAction<LoginMember>) {
    try {
        const user : IUser = yield call(login, action.payload);
        yield axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
        yield setCookie('refreshToken',user.refreshToken, {
            path : '/',
            secure : false,
        });
        yield setCookie('userId',user.userId, {
            path : '/',
            secure : false,
        });
        yield put(loginAsyncSuccess());
    }
    catch (error) {
        yield put(loginAsyncError({error : "아이디, 비밀번호가 일치하지 않습니다."}));
    }
}

export function* loginSaga() {
    yield takeEvery(loginAsync, handleLoginSaga);
}

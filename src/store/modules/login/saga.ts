import {PayloadAction} from "@reduxjs/toolkit";
import {login, LoginMember} from "src/apis/Member";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {loginAsync, loginAsyncSuccess, loginAsyncError, IUser} from './login';
import {setCookie} from "src/utils/cookieUtil";
import {securityAxios} from "src/security/axios";

function* handleLoginSaga(action: PayloadAction<LoginMember>) {
    try {
        const user: IUser = yield call(login, action.payload);
        yield securityAxios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
        yield setCookie('userId', user.userId, {
            path: '/',
            secure: false,
            maxAge: 60 * 60 * 24 * 7,
        });
        yield put(loginAsyncSuccess());
        yield window.location.reload();
    } catch (error) {
        yield put(loginAsyncError({error: "아이디, 비밀번호가 일치하지 않습니다."}));
    }
}

export function* loginSaga() {
    yield takeEvery(loginAsync, handleLoginSaga);
}

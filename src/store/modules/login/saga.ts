import {PayloadAction} from "@reduxjs/toolkit";
import {login, LoginMember} from "src/apis/Member";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {loginAsync, loginAsyncSuccess, loginAsyncError} from './login';


function* handleLoginSaga(action : PayloadAction<LoginMember>) {
    try {
        const member : string = yield call(login, action.payload);
        yield put(loginAsyncSuccess(member));
    }
    catch (error) {
        yield put(loginAsyncError({error : "아이디, 비밀번호가 일치하지 않습니다."}));
    }
}

export function* loginSaga() {
    yield takeEvery(loginAsync, handleLoginSaga);
}

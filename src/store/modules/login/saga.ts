import {PayloadAction} from "@reduxjs/toolkit";
import {login, LoginMember} from "src/apis/Member";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import {loginAsync, loginAsyncSuccess, loginAsyncError, IUser} from './login';
import {setAxiosToken} from "src/utils/axiosUtil";


function* handleLoginSaga(action : PayloadAction<LoginMember>) {
    try {
        const user : IUser = yield call(login, action.payload);
        yield setAxiosToken(user.accessToken);
        yield put(loginAsyncSuccess(user));
    }
    catch (error) {
        yield put(loginAsyncError({error : "아이디, 비밀번호가 일치하지 않습니다."}));
    }
}

export function* loginSaga() {
    yield takeEvery(loginAsync, handleLoginSaga);
}

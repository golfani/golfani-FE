import {PayloadAction} from "@reduxjs/toolkit";
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {getTagList, ITagDto} from "src/apis/Tag";
import {tagAsync,tagAsyncSuccess,tagAsyncError,searchUserAsync,searchUserSuccess,searchUserError} from "./search"
import {IMember, searchByUserId} from "src/apis/Member";

function* handleTagSaga(action : PayloadAction<string>) {
    try {
        const response : ITagDto[]= yield call(getTagList,action.payload);
        yield put(tagAsyncSuccess(response));
    }
    catch (e) {
        yield put(tagAsyncError(e));
    }
}

function* handleSearchUserSaga(action : PayloadAction<string>) {
    try {
        const response : IMember[] = yield call(searchByUserId,action.payload);
        yield put(searchUserSuccess(response));
    }
    catch (e) {
        yield put(searchUserError(e));
    }
}

export function* searchSaga() {
    yield takeLatest(tagAsync,handleTagSaga);
    yield takeLatest(searchUserAsync,handleSearchUserSaga);
}

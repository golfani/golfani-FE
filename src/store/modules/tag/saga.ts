import {PayloadAction} from "@reduxjs/toolkit";
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {getTagList, ITagDto} from "src/apis/Tag";
import {tagAsync,tagAsyncSuccess,tagAsyncError} from "./tag"

function* handleTagSaga(action : PayloadAction<string>) {
    try {
        const response : ITagDto[]= yield call(getTagList,action.payload);
        yield put(tagAsyncSuccess(response));
    }
    catch (e) {
        yield put(tagAsyncError(e));
    }
}

export function* tagSaga() {
    yield takeLatest(tagAsync,handleTagSaga);
}

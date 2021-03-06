import createSagaMiddleware, {Task} from "@redux-saga/core";
import {combineReducers, Store} from "redux";
import login from "./login/login";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {all} from "@redux-saga/core/effects";
import {loginSaga} from "./login/saga";
import {createWrapper} from "next-redux-wrapper";
import feedType from "./feedType/feedType";
import feedMenu from "./feedMenu/feedMenu";
import feedAdd from "./feedAdd/feedAdd";
import {searchSaga} from "./search/saga";
import search from "./search/search";
import feedZIndex from "./feedZIndex/feedZIndex";
import shopRegister from "./shopRegister/shopRegister";


interface SagaStore extends Store {
    sagaTask?: Task;
}

// rootReducer 생성
const rootReducer = combineReducers({
    login: login,
    feedType: feedType,
    feedMenu: feedMenu,
    feedAdd: feedAdd,
    search: search,
    feedZIndex: feedZIndex,
    shopRegister: shopRegister,
})

// 스토어 생성
export const store = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware]
    });

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export default function* rootSaga() {
    yield all([loginSaga(), searchSaga()]);
}

export const wrapper = createWrapper(store, {
    debug: process.env.NODE_ENV === 'development'
});

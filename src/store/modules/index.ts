import createSagaMiddleware, {Task} from "@redux-saga/core";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import login from "./login/login";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import logger from "redux-logger";
import {all} from "@redux-saga/core/effects";
import {loginSaga} from "./login/saga";
import {createWrapper} from "next-redux-wrapper";
import feedType from "./feedType/feedType";
import feedMenu from "./feedMenu/feedMenu";
import feedAdd from "./feedAdd/feedAdd";
import {tagSaga} from "./tag/saga";
import tag from "./tag/tag";


interface SagaStore extends Store {
    sagaTask? : Task;
}

// rootReducer 생성
const rootReducer = combineReducers({
    login : login,
    feedType : feedType,
    feedMenu : feedMenu,
    feedAdd : feedAdd,
    tag : tag,
})

// 스토어 생성
export const store = () => {
    const isClient = typeof window !== 'undefined';
    // saga 미들웨어 생성
    const sagaMiddleware = createSagaMiddleware();
    let store;

    if(isClient) {
        const { persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage/session').default;

        const persistConfig = {
            key : 'root',
            storage,
            whitelist : ["login"]
        };
        store = createStore(
            persistReducer(persistConfig,rootReducer),
            applyMiddleware(sagaMiddleware)
        );

    }
    else {
        store = configureStore({
            reducer: rootReducer,
            middleware: [sagaMiddleware]
        });
    }

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export default function* rootSaga() {
    yield all([loginSaga(),tagSaga()]);
}

export const wrapper = createWrapper(store, {
    debug : process.env.NODE_ENV === 'development'
})

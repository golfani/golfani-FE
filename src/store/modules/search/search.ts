import {ITagDto} from "src/apis/Tag";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMember} from "src/apis/Member";

interface ITagState {
    loading : boolean
    data : ITagDto[] | null
    error : Error | null
}

interface IUserState {
    loading : boolean
    data : IMember[] | null
    error : Error | null
}

interface ISearchState {
    tag : ITagState
    user : IUserState
}

const initialState : ISearchState = {
    tag : {
        loading : false,
        data : null,
        error : null
    },
    user : {
        loading : false,
        data : null,
        error : null
    }
}

export const searchSlice = createSlice({
    name : 'tag',
    initialState : initialState,
    reducers : {
        tagAsync(state : ISearchState, action : PayloadAction<string>) {
            state.tag.loading = true;
            state.tag.data = null;
            state.tag.error = null;
        },
        tagAsyncSuccess(state : ISearchState, action : PayloadAction<ITagDto[]>) {
            state.tag.loading = false;
            state.tag.data = action.payload;
            state.tag.error = null;
        },
        tagAsyncError(state : ISearchState, action : PayloadAction<Error>) {
            state.tag.loading = false;
            state.tag.data = null;
            state.tag.error = action.payload;
        },
        initTag(state : ISearchState) {
            state.tag.loading = false;
            state.tag.data = null;
            state.tag.error = null;
        },
        searchUserAsync(state : ISearchState, action : PayloadAction<string>) {
            state.user.loading = true;
            state.user.data = null;
            state.user.error = null;
        },
        searchUserSuccess(state : ISearchState, action : PayloadAction<IMember[]>) {
            state.user.loading = false;
            state.user.data = action.payload;
            state.user.error = null;
        },
        searchUserError(state : ISearchState, action : PayloadAction<Error>) {
            state.user.loading = false;
            state.user.data = null;
            state.user.error = action.payload;
        },
        initSearchUser(state : ISearchState) {
            state.user.loading = false;
            state.user.data = null;
            state.user.error = null;
        }
    }
});

export default searchSlice.reducer;
export const {tagAsync,tagAsyncSuccess,tagAsyncError,initTag,searchUserAsync,searchUserError,searchUserSuccess,initSearchUser} = searchSlice.actions;

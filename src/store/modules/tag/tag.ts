import {ITagDto} from "src/apis/Tag";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITagState {
    loading : boolean
    data : ITagDto[] | null
    error : Error | null
}

const initialState : ITagState = {
    loading : false,
    data : null,
    error : null
}

export const tagSlice = createSlice({
    name : 'tag',
    initialState : initialState,
    reducers : {
        tagAsync(state : ITagState, action : PayloadAction<string>) {
            state.loading = true;
            state.data = null;
            state.error = null;
        },
        tagAsyncSuccess(state : ITagState, action : PayloadAction<ITagDto[]>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        tagAsyncError(state : ITagState, action : PayloadAction<Error>) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
        initTag(state : ITagState) {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    }
});

export default tagSlice.reducer;
export const {tagAsync,tagAsyncSuccess,tagAsyncError,initTag} = tagSlice.actions;

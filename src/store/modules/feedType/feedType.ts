import {createSlice} from "@reduxjs/toolkit";

export type FeedTypeState = {
    type : boolean
}

const initialState : FeedTypeState = {
    type : false
}

export const feedTypeSlice = createSlice({
    name : 'feedType',
    initialState : initialState,
    reducers : {
        changeListView(state : FeedTypeState) {
            state.type = false;
        },
        changeCardView(state : FeedTypeState) {
            state.type = true
        }
    },
});

export default feedTypeSlice.reducer;
export const {changeListView, changeCardView} = feedTypeSlice.actions

import {createSlice} from "@reduxjs/toolkit";

type TFeedType = "LIST" | "CARD" | "HOT" | "SEARCH" | "MOBILE_SEARCH"

export interface IFeedTypeState {
    type : TFeedType
}

const initialState : IFeedTypeState = {
    type : "LIST"
}

export const feedTypeSlice = createSlice({
    name : 'feedType',
    initialState : initialState,
    reducers : {
        changeListView(state : IFeedTypeState) {
            state.type = "LIST"
        },
        changeCardView(state : IFeedTypeState) {
            state.type = "CARD"
        },
        changeHotView(state : IFeedTypeState) {
            state.type = "HOT"
        },
        changeSearchView(state : IFeedTypeState) {
            state.type = "SEARCH"
        },
        changeMobileSearchView(state : IFeedTypeState) {
            state.type = "MOBILE_SEARCH"
        }
    },
});

export default feedTypeSlice.reducer;
export const {changeListView, changeCardView, changeHotView, changeSearchView, changeMobileSearchView} = feedTypeSlice.actions

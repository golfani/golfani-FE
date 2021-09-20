import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type FeedMenuState = {
    menu : number | null
}

const initialState : FeedMenuState = {
    menu : null
}

export const feedMenuSlice = createSlice({
    name : 'feedMenu',
    initialState : initialState,
    reducers : {
        changeMenu(state : FeedMenuState, action : PayloadAction<number>) {
            state.menu = action.payload;
        },
        initMenu(state) {
            state.menu = null;
        }
    }
})

export default feedMenuSlice.reducer;
export const {changeMenu, initMenu} = feedMenuSlice.actions;

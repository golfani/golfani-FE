import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// NONE : 메뉴가 선택되지않은 상태, HOT : 인기피드 메뉴 선택상태, MY_FEED : 내 최근피드 메뉴 선택상태
// null 은 초기상태
export type TFeedMenu = 'NONE' | 'HOT' | 'MY_FEED';

interface IFeedMenuState  {
    menu : TFeedMenu | null
}

const initialState : IFeedMenuState = {
    menu : null
}

export const feedMenuSlice = createSlice({
    name : 'feedMenu',
    initialState : initialState,
    reducers : {
        changeMenu(state : IFeedMenuState, action : PayloadAction<TFeedMenu>) {
            state.menu = action.payload;
        },
        initMenu(state) {
            state.menu = null;
        }
    }
})

export default feedMenuSlice.reducer;
export const {changeMenu, initMenu} = feedMenuSlice.actions;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IChatRoomState {
    activeId : number | null
}

const initialState : IChatRoomState = {
    activeId : null
}

export const chatRoomSlice = createSlice({
    name : 'chatRoom',
    initialState : initialState,
    reducers : {
        setChatRoom(state : IChatRoomState, action : PayloadAction<number>) {
            state.activeId = action.payload;
        }
    }
})

export default chatRoomSlice.reducer;
export const {setChatRoom} = chatRoomSlice.actions;

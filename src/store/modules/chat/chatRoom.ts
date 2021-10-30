import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChatRoomDto} from "src/apis/Chat";

interface IChatRoomState {
    chatRoom? : IChatRoomDto
}

const initialState : IChatRoomState = {
}

export const chatRoomSlice = createSlice({
    name : 'chatRoom',
    initialState : initialState,
    reducers : {
        setChatRoom(state : IChatRoomState, action : PayloadAction<IChatRoomDto>) {
            state.chatRoom = action.payload;
        },
        init(state : IChatRoomState) {
            state.chatRoom = undefined;
        }
     }
})

export default chatRoomSlice.reducer;
export const {setChatRoom,init} = chatRoomSlice.actions;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TNotice = 'FEED_LIKE' | 'FEED_REPLY' | 'POST_LIKE' | 'POST_REPLY' | 'REPLY' | 'MESSAGE';

export interface INotice {
    type : TNotice
    userId : string
    refId : number
    content : string | null
    date : Date
    isRead : boolean
}

const initialState : INotice[] = [
    {
        type : "FEED_LIKE",
        userId : "gudwh14",
        refId : 10,
        content : null,
        isRead : false,
        date : new Date()
    },
    {
        type : "FEED_REPLY",
        userId : "gudwh14",
        refId : 1,
        content : '멋있어요!!',
        isRead : false,
        date : new Date()
    },
    {
        type : "REPLY",
        userId : "gudwh14",
        refId : 1,
        content : '엥 그건 아닌거 같아요',
        isRead : false,
        date : new Date()
    },
    {
        type : "MESSAGE",
        userId : "gudwh14",
        refId : 1,
        content : '안녕하세요! 게시글 보고 연락드려요!',
        isRead : false,
        date : new Date()
    },
    {
        type : "MESSAGE",
        userId : "gudwh14",
        refId : 1,
        content : '안녕하세요! 게시글 보고 연락드려요!',
        isRead : false,
        date : new Date()
    },
    {
        type : "MESSAGE",
        userId : "gudwh14",
        refId : 1,
        content : '안녕하세요! 게시글 보고 연락드려요, 너무 팬이에요 답장 부탁드려요!',
        isRead : true,
        date : new Date()
    },
];

export const noticeSlice = createSlice({
    name : 'notice',
    initialState : initialState,
    reducers : {
        addNotice(state : INotice[], action : PayloadAction<INotice>) {
            state.splice(0,0,action.payload);
        },
        readCommonNotice(state : INotice[]) {
            state.map((item)=> {
                if(item.type !== 'MESSAGE')
                    item.isRead = true;
            })
        },
        readMessageNotice(state : INotice[], action : PayloadAction<string>) {

        }
    }
});

export default noticeSlice.reducer;
export const {addNotice,readCommonNotice} = noticeSlice.actions
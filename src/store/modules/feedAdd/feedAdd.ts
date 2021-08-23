import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IImg {
    imgFile : File
    imgFileUrl : string
}

export interface IFeedAddState  {
    memberId : number | null
    content : string
    imgList : IImg[]
    tagList : string[]
    isReplyActive : boolean
    isLikesActive : boolean
}

const initialState : IFeedAddState = {
    memberId : null,
    content : "",
    imgList : [],
    tagList : [],
    isLikesActive : true,
    isReplyActive : true
}

export const feedAddSlice = createSlice({
    name : 'feedAdd',
    initialState : initialState,
    reducers : {
        addImg (state : IFeedAddState, action : PayloadAction<IImg>) {
            state.imgList.push(action.payload);
        },
        deleteImg (state : IFeedAddState, action : PayloadAction<number>) {
            state.imgList = state.imgList.filter((img,index)=> index !== action.payload);
        },
        addTag (state : IFeedAddState, action : PayloadAction<string>) {
            state.tagList.push(action.payload);
        },
        deleteTag (state : IFeedAddState, action : PayloadAction<number>) {
            state.tagList = state.tagList.filter((tag,index)=> index !== action.payload);
        },
        setContent (state : IFeedAddState, action : PayloadAction<string>) {
            state.content = action.payload;
        },
        toggleReplyActive (state : IFeedAddState) {
            state.isReplyActive = !state.isReplyActive;
        },
        toggleLikesActive (state : IFeedAddState) {
            state.isLikesActive = !state.isLikesActive;
        }
    },
})

export default feedAddSlice.reducer;
export const {addImg,deleteImg,addTag,deleteTag,setContent,toggleLikesActive,toggleReplyActive} = feedAddSlice.actions

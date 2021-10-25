import {createSlice} from "@reduxjs/toolkit";

type TFeedZIndex = 'ABOVE' | 'BELOW';

interface IFeedZIndex {
    state : TFeedZIndex
}

const initialState : IFeedZIndex = {
    state : "ABOVE"
}

export const FeedZIndexSlice = createSlice({
    name : 'feedZIndex',
    initialState : initialState,
    reducers : {
        setAbove(state : IFeedZIndex) {
            state.state = 'ABOVE';
        },
        setBelow(state : IFeedZIndex) {
            state.state = 'BELOW';
        }
    }
});

export default FeedZIndexSlice.reducer;
export const {setAbove,setBelow} = FeedZIndexSlice.actions

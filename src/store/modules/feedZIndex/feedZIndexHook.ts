import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {setAbove,setBelow} from './feedZIndex';

const useFeedZIndex = () => {
    const state = useSelector((state : RootState) => state.feedZIndex.state);

    const dispatch = useDispatch();

    const onSetAbove = () => {
        dispatch(setAbove());
    }

    const onSetBelow = () => {
        dispatch(setBelow());
    }

    return {state,onSetAbove,onSetBelow}
}

export default useFeedZIndex;

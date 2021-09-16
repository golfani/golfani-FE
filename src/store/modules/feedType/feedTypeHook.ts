import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeListView, changeCardView, changeHotView} from './feedType';

const useFeedType = () => {
    const type = useSelector((state : RootState) => state.feedType.type);

    const dispatch = useDispatch();

    const onChangeListView = () => {
        dispatch(changeListView());
    }

    const onChangeCardView = () => {
        dispatch(changeCardView());
    }

    const onChangeHotView = () => {
        dispatch(changeHotView());
    }

    return {type, onChangeListView, onChangeCardView, onChangeHotView};
}

export default useFeedType;

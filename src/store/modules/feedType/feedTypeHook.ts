import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeListView, changeCardView, changeHotView, changeSearchView} from './feedType';

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

    const onChangeSearchView = () => {
        dispatch(changeSearchView());
    }

    return {type, onChangeListView, onChangeCardView, onChangeHotView, onChangeSearchView};
}

export default useFeedType;

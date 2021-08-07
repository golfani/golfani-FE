import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeListView, changeCardView} from './feedType';

const useFeedType = () => {
    const type = useSelector((state : RootState) => state.feedType.type);

    const dispatch = useDispatch();

    const onChangeListView = () => {
        dispatch(changeListView());
    }

    const onChangeCardView = () => {
        dispatch(changeCardView());
    }

    return {type, onChangeListView, onChangeCardView};
}

export default useFeedType;

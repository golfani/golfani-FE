import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeListView, changeCardView, changeHotView, changeSearchView, changeMobileSearchView} from './feedType';

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

    const onChangeMobileSearchView = () => {
        dispatch(changeMobileSearchView());
    }

    return {type, onChangeListView, onChangeCardView, onChangeHotView, onChangeSearchView, onChangeMobileSearchView};
}

export default useFeedType;

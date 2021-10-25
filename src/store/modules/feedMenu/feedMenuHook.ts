import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeMenu, initMenu, TFeedMenu} from './feedMenu'

const useFeedMenu = () => {
    const menu = useSelector((state : RootState)=> state.feedMenu.menu);

    const dispatch = useDispatch();

    const onChangeMenu = (menu : TFeedMenu) => {
        dispatch(changeMenu(menu));
    }

    const onInitMenu = () => {
        dispatch(initMenu())
    }

    return {menu, onChangeMenu, onInitMenu};
}

export default useFeedMenu;

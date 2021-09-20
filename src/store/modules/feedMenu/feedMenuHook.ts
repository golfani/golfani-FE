import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeMenu,initMenu} from './feedMenu'

const useFeedMenu = () => {
    const menu = useSelector((state : RootState)=> state.feedMenu.menu);

    const dispatch = useDispatch();

    const onChangeMenu = (menu : number) => {
        dispatch(changeMenu(menu));
    }

    const onInitMenu = () => {
        dispatch(initMenu())
    }

    return {menu, onChangeMenu, onInitMenu};
}

export default useFeedMenu;

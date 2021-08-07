import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {changeMenu} from './feedMenu'

const useFeedMenu = () => {
    const menu = useSelector((state : RootState)=> state.feedMenu.menu);

    const dispatch = useDispatch();

    const onChangeMenu = (menu : number) => {
        dispatch(changeMenu(menu));
    }

    return {menu, onChangeMenu};
}

export default useFeedMenu;

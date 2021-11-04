import SearchIcon from '@material-ui/icons/Search';
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedBottomNav.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";

const FeedBottomNav = () : JSX.Element => {
    const {type,onChangeListView,onChangeCardView} = useFeedType();

    const handleClickListView = () => {
        onChangeListView();
    }

    const handleClickCardView = () => {
        onChangeCardView();
    }

    return (
        <ul className={style.bottom_menu_box}>
            <li className={style.menu_list} onClick={handleClickListView}>
                <ViewDayOutlinedIcon
                    className={type === 'LIST' ? style.icon_active : style.icon_inactive}
                />
            </li >
            <li className={style.menu_list} onClick={handleClickCardView}>
                <ViewModuleOutlinedIcon
                    className={type === 'CARD' ? style.icon_active : style.icon_inactive}
                />
            </li>
            <li className={style.menu_list}>
                <SearchIcon className={style.icon_inactive}/>
            </li>
        </ul>
    );
};

export default FeedBottomNav;

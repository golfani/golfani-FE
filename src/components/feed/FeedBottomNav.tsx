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
            <li>
                <ViewDayOutlinedIcon
                    className={type === 'LIST' ? style.icon_active : style.icon_inactive}
                    onClick={handleClickListView}
                />
            </li>
            <li>
                <ViewModuleOutlinedIcon
                    className={type === 'CARD' ? style.icon_active : style.icon_inactive}
                    onClick={handleClickCardView}
                />
            </li>
            <li>
                <SearchIcon className={style.icon_inactive}/>
            </li>
        </ul>
    );
};

export default FeedBottomNav;

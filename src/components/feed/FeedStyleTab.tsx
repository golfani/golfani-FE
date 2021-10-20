import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedStyleTab.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";

const FeedStyleTab = () : JSX.Element => {
    const {type, onChangeCardView, onChangeListView} = useFeedType();
    const feedMenu = useFeedMenu();
    const router = useRouter();
    const {search} = router.query;

    const onRoute = () => {
       if(search) {
           if(typeof window !== 'undefined') {
               window.location.href = '/feed';
               feedMenu.onInitMenu();
           }
       }
    }

    const handleClickListView = () => {
        onChangeListView();
        onRoute();
    }

    const handleClickCardView = () => {
        onChangeCardView();
        onRoute();
    }

    return (
        <div className={style.tab_box}>
            <div onClick={handleClickListView} className={style.icon_box}>
                <ViewDayOutlinedIcon className={type === 'LIST' ? style.icon_active : style.icon_inactive}/>
            </div>
            <div onClick={handleClickCardView} className={style.icon_box}>
                <ViewModuleOutlinedIcon className={type === 'LIST' ? style.icon_inactive : style.icon_active}/>
            </div>
        </div>
    );
};

export default FeedStyleTab;

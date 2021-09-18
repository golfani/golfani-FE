import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedStyleTab.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";

const FeedStyleTab = () : JSX.Element => {
    const {type, onChangeCardView, onChangeListView} = useFeedType();
    const router = useRouter();

    const onRoute = () => {
        router.push('feed');
    }

    const handleClickListView = () => {
        onRoute();
        onChangeListView();
    }

    const handleClickCardView = () => {
        onRoute();
        onChangeCardView();
    }

    return (
        <div className={style.tab_box}>
            <div onClick={handleClickListView} className={style.icon_box}>
                <ViewDayOutlinedIcon color={type === 'LIST' ? 'primary' : 'disabled'}/>
            </div>
            <div onClick={handleClickCardView} className={style.icon_box}>
                <ViewModuleOutlinedIcon color={type === 'LIST' ? 'disabled' : 'primary'}/>
            </div>
        </div>
    );
};

export default FeedStyleTab;

import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedStyleTab.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";

const FeedStyleTab = () : JSX.Element => {
    const {type, onChangeCardView, onChangeListView} = useFeedType();
    const router = useRouter();
    const {search} = router.query;

    const onRoute = () => {
       if(search) {
           // const url = window.location;
           // url.assign("http://localhost:3000/feed");
           router.push('/routing');
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
                <ViewDayOutlinedIcon color={type === 'LIST' ? 'primary' : 'disabled'}/>
            </div>
            <div onClick={handleClickCardView} className={style.icon_box}>
                <ViewModuleOutlinedIcon color={type === 'LIST' ? 'disabled' : 'primary'}/>
            </div>
        </div>
    );
};

export default FeedStyleTab;

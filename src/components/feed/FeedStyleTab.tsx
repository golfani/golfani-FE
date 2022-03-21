import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedStyleTab.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import {TFeedType} from "src/store/modules/feedType/feedType";

const FeedStyleTab = (): JSX.Element => {
    const {type, onChangeCardView, onChangeListView} = useFeedType();
    const feedMenu = useFeedMenu();
    const router = useRouter();
    const {search, id} = router.query;

    const onRoute = () => {
        if (search) {
            if (typeof window !== 'undefined') {
                window.location.href = '/feed';
                feedMenu.onInitMenu();
            }
        } else if (id) {
            router.push('/feed');
        }
    }

    const handleClickListType = (type: TFeedType) => {
        if (type === 'LIST') {
            onChangeListView();
        } else if (type == 'CARD') {
            onChangeCardView();
        }
        onRoute();
    }

    return (
        <div className={style.tab_box}>
            <div onClick={() => handleClickListType('LIST')} className={style.icon_box}>
                <ViewDayOutlinedIcon className={type === 'LIST' ? style.icon_active : style.icon_inactive}/>
            </div>
            <div onClick={() => handleClickListType('CARD')} className={style.icon_box}>
                <ViewModuleOutlinedIcon className={type === 'LIST' ? style.icon_inactive : style.icon_active}/>
            </div>
        </div>
    );
};

export default FeedStyleTab;

import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import style from './feedStyleTab.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";

const FeedStyleTab = () : JSX.Element => {
    const {type, onChangeCardView, onChangeListView} = useFeedType();

    return (
        <div className={style.tab_box}>
            <div onClick={onChangeListView} className={style.icon_box}>
                <ViewDayOutlinedIcon color={type === 'LIST' ? 'primary' : 'disabled'}/>
            </div>
            <div onClick={onChangeCardView} className={style.icon_box}>
                <ViewModuleOutlinedIcon color={type === 'LIST' ? 'disabled' : 'primary'}/>
            </div>
        </div>
    );
};

export default FeedStyleTab;

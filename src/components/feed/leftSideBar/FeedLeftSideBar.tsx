import style from './feedLeftSideBar.module.css'
import HotFeed from "./HotFeed";
import MyFeed from "./MyFeed";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import {TFeedMenu} from "src/store/modules/feedMenu/feedMenu";

const FeedLeftSideBar = () : JSX.Element => {
    const {menu, onChangeMenu} = useFeedMenu();

    const handleMenu = (id : TFeedMenu) => {
        if(menu === id) {
            onChangeMenu('NONE');
        }
        else {
            onChangeMenu(id);
        }
    }

    return (
        <div className={style.container}>
            <ul>
                <li onClick={()=>handleMenu('HOT')} className={menu==='HOT' ? style.menu_box_active : style.menu_box}>
                    <span className={style.menu_txt}>인기 피드</span>
                    <ArrowRightIcon className={style.menu_arrow}/>
                </li>
                <li onClick={()=>handleMenu('MY_FEED')} className={menu==='MY_FEED' ? style.menu_box_active : style.menu_box}>
                    <span className={style.menu_txt}>내 최근 피드</span>
                    <ArrowRightIcon className={style.menu_arrow}/>
                </li>
            </ul>
            {menu==='HOT' && <HotFeed/>}
            {menu==='MY_FEED' && <MyFeed/>}
        </div>
    );
};

export default FeedLeftSideBar;
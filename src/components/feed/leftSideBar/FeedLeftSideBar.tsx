import style from './feedLeftSideBar.module.css'
import HotFeed from "./HotFeed";
import MyFeed from "./MyFeed";
import RecentActivityList from "./RecentActivityList";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import useFeedMenu from "../../../store/modules/feedMenu/feedMenuHook";

const FeedLeftSideBar = () : JSX.Element => {
    const {menu, onChangeMenu} = useFeedMenu();

    const handleMenu = (id : number) => {
        if(menu === id) {
            onChangeMenu(0);
        }
        else {
            onChangeMenu(id);
        }
    }

    return (
        <div className={style.container}>
            <ul>
                <li onClick={()=>handleMenu(1)} className={menu===1 ? style.menu_box_active : style.menu_box}>
                    <span className={style.menu_txt}>인기 피드</span>
                    <ArrowRightIcon className={style.menu_arrow}/>
                </li>
                <li onClick={()=>handleMenu(2)} className={menu===2 ? style.menu_box_active : style.menu_box}>
                    <span className={style.menu_txt}>내 최근 피드</span>
                    <ArrowRightIcon className={style.menu_arrow}/>
                </li>
                <li onClick={()=>handleMenu(3)} className={menu===3 ? style.menu_box_active : style.menu_box}>
                    <span className={style.menu_txt}>최근 활동 기록</span>
                    <ArrowRightIcon className={style.menu_arrow}/>
                </li>
            </ul>
            {menu===1 && <HotFeed/>}
            {menu===2 && <MyFeed/>}
            {menu===3 && <RecentActivityList/>}
        </div>
    );
};

export default FeedLeftSideBar;
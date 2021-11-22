import style from './feedMain.module.css';
import FeedList from "./list/FeedList";
import CardList from "./card/CardList";
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import {useEffect} from "react";
import FeedBottomNav from "../FeedBottomNav";

const FeedMain = () : JSX.Element => {
    const {type} = useFeedType();
    const {menu,onInitMenu} = useFeedMenu();

    useEffect(()=> {
        onInitMenu();
    },[])

    return (
        <div className={menu === null ? style.container : menu!=='NONE' ? style.container_menu_active : style.container_menu_inactive}>
            {type === 'LIST'? <FeedList/> : <CardList/>}
            <FeedBottomNav/>
        </div>
    );
};

export default FeedMain;

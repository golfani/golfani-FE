import style from './feedMain.module.css';
import FeedList from "./list/FeedList";
import CardList from "./card/CardList";
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import AddIcon from '@material-ui/icons/Add';
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";

const FeedMain = () : JSX.Element => {
    const {type} = useFeedType();
    const {menu,onInitMenu} = useFeedMenu();
    const router = useRouter();
    const userId = getCookie('userId');

    useEffect(()=> {
        onInitMenu();
    },[])

    const handleClickWrite = () => {
        userId ? router.push('/feed/write') : router.push('/login');
    }

    return (
        <div className={menu === null ? style.container : menu ? style.container_menu_active : style.container_menu_inactive}>
            {type === 'LIST'? <FeedList/> : <CardList/>}
            <div className={style.write_box} onClick={handleClickWrite}>
                <AddIcon className={style.write_icon}/>
            </div>
        </div>
    );
};

export default FeedMain;

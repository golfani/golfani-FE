import FeedNavBar from "src/components/feed/FeedNavBar";
import FeedAdd from "src/components/feed/add/FeedAdd";
import style from "styles/feed.module.css"
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";

const FeedWrite = () : JSX.Element => {
    const feedAdd = useFeedAdd();
    const router = useRouter();

    useEffect(()=> {
        getCookie('userId') || router.push('/login');
        feedAdd.onInit();
    },[])

    return (
        <div className={style.write_container}>
            <FeedNavBar/>
            <FeedAdd/>
        </div>
    );
};

export default FeedWrite;

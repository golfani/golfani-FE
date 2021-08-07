import style from 'styles/feed.module.css';
import NavBar from "src/components/common/NavBar";
import FeedLeftSideBar from "src/components/feed/leftSideBar/FeedLeftSideBar";
import FeedMain from "src/components/feed/main/FeedMain";

const Feed = () : JSX.Element => {

    return (
        <div className={style.home_container}>
            <NavBar/>
            <div className={style.main_container}>
                <FeedLeftSideBar/>
                <FeedMain/>
            </div>
        </div>
    )
};

export default Feed;

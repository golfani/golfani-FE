import style from './feedList.module.css';
import FeedItem from "./FeedItem";

const FeedList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
        </div>
    )
}

export default FeedList;
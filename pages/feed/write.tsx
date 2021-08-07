import FeedNavBar from "src/components/feed/FeedNavBar";
import FeedAdd from "src/components/feed/add/FeedAdd";
import style from "styles/feed.module.css"

const FeedWrite = () : JSX.Element => {
    return (
        <div className={style.container}>
            <FeedNavBar/>
            <FeedAdd/>
        </div>
    );
};

export default FeedWrite;

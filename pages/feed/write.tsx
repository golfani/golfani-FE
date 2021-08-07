import NavBar from "src/components/common/NavBar";
import FeedAdd from "src/components/feed/add/FeedAdd";
import style from "styles/feed.module.css"

const FeedWrite = () : JSX.Element => {
    return (
        <div className={style.container}>
            <NavBar/>
            <FeedAdd/>
        </div>
    );
};

export default FeedWrite;

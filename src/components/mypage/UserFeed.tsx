import style from './userFeed.module.css';
import BestFeed from "./BestFeed";

const UserFeed = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.best_txt}>베스트 피드</span>
                <span className={style.all_txt}>ALL 피드</span>
            </div>
            <BestFeed/>
        </div>
    );
};

export default UserFeed;

import {IFeedProps} from "src/domain/Feed";
import FeedLike from "./FeedLike";
import FeedDetailMenu from "./FeedDetailMenu";
import style from './feedSideMenu.module.css';

const FeedSideMenu = ({feed} : IFeedProps) : JSX.Element => {
    return (
        <div className={style.container}>
            { feed.isLikesActive && <FeedLike feed={feed}/> }
            <FeedDetailMenu feed={feed}/>
        </div>
    );
};

export default FeedSideMenu;

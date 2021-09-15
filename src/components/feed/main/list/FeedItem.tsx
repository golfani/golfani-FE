import style from './feedItem.module.css';
import FeedImg from "./FeedImg";
import FeedMain from "./FeedMain";
import FeedReply from "./FeedReply";
import {IFeedContent} from "src/apis/Feed";
import FeedSideMenu from "./FeedSideMenu";

export interface IFeedItemProps {
    feed : IFeedContent
    isModal : boolean
}

const FeedItem = ({feed, isModal} : IFeedItemProps) : JSX.Element => {

    return(
        <div className={isModal ? style.container_modal : style.container} key={feed.id}>
            <FeedSideMenu feed={feed}/>
            <FeedImg feed={feed}/>
            <div>
                <FeedMain feed={feed}/>
                { feed.isReplyActive && <FeedReply feed={feed} isModal={isModal}/> }
            </div>
        </div>
    );
};

export default FeedItem;

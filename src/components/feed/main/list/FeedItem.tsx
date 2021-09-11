import style from './feedItem.module.css';
import FeedImg from "./FeedImg";
import FeedMain from "./FeedMain";
import FeedReply from "./FeedReply";
import FeedLike from "./FeedLike";
import {IPages} from "src/domain/Page";
import {IFeedContent} from "src/apis/Feed";
import FeedDetailMenu from "./FeedDetailMenu";
import FeedSideMenu from "./FeedSideMenu";

interface IFeedItemProps {
    pages : Array<IPages<IFeedContent>> | undefined
}

const FeedItem = ({pages} : IFeedItemProps) : JSX.Element => {

    return(
        <>
            {pages?.map((page)=> (
                page.content.map((feed)=> (
                    <div className={style.container} key={feed.id}>
                        <FeedSideMenu feed={feed}/>
                        <FeedImg feed={feed}/>
                        <FeedMain feed={feed}/>
                        { feed.isReplyActive && <FeedReply feed={feed}/> }
                    </div>
                ))
            ))}
        </>
    );
};

export default FeedItem;

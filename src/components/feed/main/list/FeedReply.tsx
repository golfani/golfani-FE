import style from './feedReply.module.css';
import FeedReplyItem from "./FeedReplyItem";
import FeedReplyAdd from "./FeedReplyAdd";
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getFeedReply, IReplyDto} from "src/apis/Reply";

const FeedReply = ({feed} : IFeedProps) => {
    const replyQuery = useQuery<IPages<IReplyDto>,Error>(['feedReply',feed.id],() =>  getFeedReply(feed.id), {
        staleTime : 1000 * 60
    });

    return (
        <div className={style.container}>
            {replyQuery.data?.content.map((reply)=> (
                <FeedReplyItem key={reply.id} reply={reply}/>
            ))}
            <span className={style.reply_more_txt}>댓글 더보기</span>
            <div className={style.divider}></div>
            <FeedReplyAdd feedId={feed.id} replyId={null}/>
        </div>
    )
}

export default FeedReply;

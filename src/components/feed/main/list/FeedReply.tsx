import style from './feedReply.module.css';
import FeedReplyItem from "./FeedReplyItem";
import FeedReplyAdd from "./FeedReplyAdd";

const FeedReply = () => {
    return (
        <div className={style.container}>
            <FeedReplyItem/>
            <span className={style.reply_more_txt}>댓글 더보기</span>
            <div className={style.divider}></div>
            <FeedReplyAdd/>
        </div>
    )
}

export default FeedReply;

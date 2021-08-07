import style from './feedReply.module.css';
import FeedReplyItem from "./FeedReplyItem";
import FeedReplyAdd from "./FeedReplyAdd";

interface FeedReplyItemProps {
    onFocus : () => void;
}

const FeedReply = ({onFocus} : FeedReplyItemProps) => {
    return (
        <div className={style.container}>
            <FeedReplyItem/>
            <span className={style.reply_more_txt}>댓글 더보기</span>
            <div className={style.divider}></div>
            <FeedReplyAdd onFocus={onFocus}/>
        </div>
    )
}

export default FeedReply;

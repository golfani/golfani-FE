import style from './feedReplyItem.module.css';


const FeedReplyItem = () => {
    return (
        <div className={style.container}>
            <span className={style.user_txt}>jjo_97</span>
            <span className={style.reply_txt}>어디로 나가신 건가요?</span>
        </div>
    );
};

export default FeedReplyItem;
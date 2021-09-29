import * as faker from "faker";
import {dateDiff} from "src/utils/dateUtil";
import style from './noticeItem.module.css';
import {INotice} from "src/store/modules/notice/notice";

interface INoticeItemProps {
    notice : INotice
}

const NoticeItem = ({notice} : INoticeItemProps) : JSX.Element => {


    const message = () => {
        let message = '';
        switch (notice.type) {
            case "FEED_LIKE":
                message = '님이 회원님의 피드를 좋아합니다.';
                break;
            case "FEED_REPLY":
                message = '님이 회원님의 피드에 댓글을 남겼습니다.';
                break;
            case "POST_LIKE":
                message = '님이 회원님의 게시글을 좋아합니다.';
                break;
            case "POST_REPLY":
                message = '님이 회원님의 게시글에 댓글을 남겼습니다.';
                break;
            case "REPLY":
                message = '님이 회원님의 댓글에 답글을 남겼습니다.';
                break;
        }
        return message;
    }

    return (
        <div className={style.container}>
            <img className={style.img} src={faker.image.avatar()} height={30} width={30}/>
            <div className={style.content_box}>
                <span className={style.userId_txt}>{notice.userId}</span>
                <span>{message()}</span>
                <span className={style.content_txt}>{notice.content}</span>
                <span className={style.date_txt}>{dateDiff(notice.date)}</span>
            </div>
        </div>
    );
};

export default NoticeItem;

import style from './feedItem.module.css';
import FeedImg from "./FeedImg";
import FeedMain from "./FeedMain";
import FeedReply from "./FeedReply";
import {IFeedContent} from "src/apis/Feed";
import FeedSideMenu from "./FeedSideMenu";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {memo} from "react";

export interface IFeedItemProps {
    feed: IFeedContent
    isModal: boolean
}

const FeedItem = ({feed, isModal}: IFeedItemProps): JSX.Element => {

    return (
        <div className={isModal ? style.container_modal : style.container} key={feed.id}>
            <FeedSideMenu feed={feed}/>
            <FeedImg feed={feed} isModal={isModal}/>
            <div className={style.item_main_box}>
                <FeedMain feed={feed}/>
                {feed.isReplyActive && <FeedReply feed={feed} isModal={isModal}/>}
                {feed.isReplyActive ||
                <div className={style.lock_box}>
                    <LockOutlinedIcon fontSize={"inherit"} className={style.lock_icon}/>
                    <span className={style.lock_txt}>댓글 기능이 비활성된 게시글입니다</span>
                </div>
                }
            </div>
        </div>
    );
};

export default memo(FeedItem);

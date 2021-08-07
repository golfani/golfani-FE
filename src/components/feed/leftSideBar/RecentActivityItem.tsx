import style from './recentActivityItem.module.css';
import {RecentActivity} from "./RecentActivityList";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

interface RecentActivityItemProps {
    items : RecentActivity[]
}

const RecentActivityItem = ({items} : RecentActivityItemProps) : JSX.Element => {
    const likeActivityTxt = "님 피드에 좋아요를 눌렀습니다.";
    const replyActivityTxt = "님 피드에 댓글을 달았습니다.";

    return (
        <div className={style.container}>
            {items.map((item,index)=>
                <div className={style.item_box} key={index}>
                    <img className={style.feed_img} src={item.feedImg}/>
                    <div>
                        <span className={style.user_txt}>{item.user}</span>
                        <span className={style.activity_txt}>{item.activity ? likeActivityTxt : replyActivityTxt}</span>
                    </div>
                    {
                        item.activity
                        ? <FavoriteIcon className={style.activity_icon} color={'error'} fontSize={'small'}/>
                        : <ChatBubbleIcon className={style.activity_icon} color={'primary'} fontSize={'small'}/>
                    }
                </div>
            )}
        </div>
    );
};

export default RecentActivityItem
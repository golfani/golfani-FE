import style from './cardItem.module.css';
import * as faker from "faker";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedReplyCount} from "src/apis/Reply";
import Image from 'next/image'
import FeedModal from "src/components/modals/FeedModal";
import {useCallback, useState} from "react";
import UserName from "src/components/common/UserName";

const CardItem = ({feed} : IFeedProps) : JSX.Element => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);

    const replyTotalQuery = useQuery(['feedReplyCount',feed.id], ()=>getFeedReplyCount(feed.id), {
        staleTime : 1000 * 60
    })

    const renderTagList = feed.tag.split('#').map((tag,index)=> {
        if(index > 0) {
            return (
                <span key={tag} className={style.main_txt}>{`#${tag}`}</span>
            )
        }
    });

    const handleImageClick = useCallback(()=> {
        setFeedModalOpen((feedModalOpen)=> true);
    },[feedModalOpen])

    return (
        <div className={style.container}>
            <Image className={style.thumbnail_img} src={feed.urlList[1]}
                   width={150}
                   height={150}
                   onClick={handleImageClick}
            />
            <div className={style.user_box}>
                <img className={style.user_img} src={faker.image.avatar()}/>
                <UserName userName={feed.userId}/>
            </div>
            <div className={style.main_box}>
                {renderTagList}
            </div>
            <div className={style.icon_box}>
                {feed.isLikesActive ?
                    <div className={style.icon_sub_box}>
                        <FavoriteBorderIcon className={style.icon} color={'error'} fontSize={"small"}/>
                        <span>{feed.likesCount}</span>
                    </div>
                    : <></>
                }
                <div className={style.icon_sub_box}>
                    <ChatBubbleOutlineIcon className={style.icon} color={'primary'} fontSize={"small"}/>
                    <span>{replyTotalQuery.data}</span>
                </div>
            </div>
            {feedModalOpen &&
            <FeedModal open={feedModalOpen} feed={feed} setOpen={setFeedModalOpen}/>
            }
        </div>
    );
};

export default CardItem;

import style from './cardItem.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedReplyCount} from "src/apis/Reply";
import Image from 'next/image'
import FeedModal from "src/components/modals/FeedModal";
import {useCallback, useState} from "react";
import UserName from "src/components/common/UserName";
import {useRouter} from "next/router";
import {getProfileImage} from "src/apis/Member";
import {MID_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import UserProfileImage from "../../../common/UserProfileImage";

const CardItem = ({feed} : IFeedProps) : JSX.Element => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);
    const router = useRouter();

    const replyTotalQuery = useQuery(['feedReplyCount',feed.id], ()=>getFeedReplyCount(feed.id), {
        staleTime : 1000 * 60
    })

    const onSearchTag = (tag : string) => {
        router.push(`/feed?search=${tag}`);
    }

    const handleClickTag = (tag : string) => {
        onSearchTag(tag);
    }

    const renderTagList = feed.tag.split('#').map((tag,index)=> {
        if(index > 0) {
            return (
                <span key={tag} className={style.main_txt} onClick={()=>handleClickTag(tag)}>{`#${tag}`}</span>
            )
        }
    });

    const handleImageClick = useCallback(()=> {
        setFeedModalOpen((feedModalOpen)=> true);
    },[feedModalOpen])

    return (
        <div className={style.container}>
            <img className={style.thumbnail_img}
                 src={feed.urlList[MID_LEVEL_FIRST_PICTURE]}
                 width={150}
                 height={150}
                 onClick={handleImageClick}
            />
            <div className={style.user_box}>
                <UserProfileImage
                    userId={feed.userId}
                    src={getProfileImage(feed.userId,'MID')}
                    width={30}
                    height={30}
                />
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

import style from './cardItem.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedReplyCount} from "src/apis/Reply";
import FeedModal from "src/components/modals/feed/FeedModal";
import {useCallback, useEffect, useState} from "react";
import UserName from "src/components/common/UserName";
import {MID_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import UserProfileImage from "src/components/common/UserProfileImage";
import useCustomRouter from "src/hooks/routerHook";

const CardItem = ({feed} : IFeedProps) : JSX.Element => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);
    const {onConflictRoute} = useCustomRouter();
    const [imgWidth, setImgWidth] = useState(150);

    const replyTotalQuery = useQuery(['feedReplyCount',feed.id], ()=>getFeedReplyCount(feed.id), {
        staleTime : 1000 * 60
    })

    const handleClickTag = (tag : string) => {
        onConflictRoute(`/feed?search=${tag}`)
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


    useEffect(()=> {
        const resizeListener = () => {
            if(window.innerWidth < 768) {
                setImgWidth(window.innerWidth / 3);
            }
            else if(window.screen.width < 768) {
                setImgWidth(window.screen.width / 3);
            }
            else {
                setImgWidth(150);
            }
        }
        resizeListener();
        window.addEventListener('resize',resizeListener);
        return () => window.removeEventListener('resize',resizeListener);
    },[]);

    return (
        <div className={style.container}>
            <img className={style.thumbnail_img}
                 src={feed.urlList[MID_LEVEL_FIRST_PICTURE]}
                 width={imgWidth}
                 height={imgWidth}
                 onClick={handleImageClick}
            />
            <div className={style.user_box}>
                <UserProfileImage
                    userId={feed.userId}
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
            {feedModalOpen && <FeedModal feed={feed} setModalOpen={setFeedModalOpen}/>}
        </div>
    );
};

export default CardItem;

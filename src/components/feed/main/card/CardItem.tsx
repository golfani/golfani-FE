import style from './cardItem.module.css';
import * as faker from "faker";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedPicture, getPictureFile, IPictureDto} from "src/apis/Picture";
import {getFeedReplyCount} from "src/apis/Reply";
import Image from 'next/image'

const CardItem = ({feed} : IFeedProps) : JSX.Element => {
    const imageQuery = useQuery<IPictureDto[]>(['feedImg',feed.id],()=>getFeedPicture(feed.id), {
        staleTime : 1000 * 60 * 10
    })

    const replyTotalQuery = useQuery(['feedReplyCount',feed.id], ()=>getFeedReplyCount(feed.id), {
        staleTime : 1000 * 60
    })

    const renderTagList = feed.tag.split('#').map((tag,index)=> {
        if(index > 0) {
            return (
                <span key={tag} className={style.main_txt}>{tag}</span>
            )
        }
    });

    return (
        <div className={style.container}>
            { imageQuery.data &&
                <Image className={style.thumbnail_img} src={getPictureFile(imageQuery.data[0].path,imageQuery.data[0].filename) as any}
                width={150} height={150}/>
            }
            <div className={style.user_box}>
                <img className={style.user_img} src={faker.image.avatar()}/>
                <span className={style.user_id_txt}>{feed.userId}</span>
            </div>
            <div className={style.main_box}>
                {renderTagList}
            </div>
            <div className={style.icon_box}>
                <div className={style.icon_sub_box}>
                    <FavoriteBorderIcon className={style.icon} color={'error'} fontSize={"small"}/>
                    <span>{feed.likesCount}</span>
                </div>
                <div className={style.icon_sub_box}>
                    <ChatBubbleOutlineIcon className={style.icon} color={'primary'} fontSize={"small"}/>
                    <span>{replyTotalQuery.data}</span>
                </div>
            </div>
        </div>
    );
};

export default CardItem;

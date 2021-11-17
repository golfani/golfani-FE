import style from './feedReplyAdd.module.css';
import {IFeedReplyAddProps} from "src/domain/Reply";
import Image from 'next/image';
import FeedReplyAddInput from "./FeedReplyAddInput";
import {getCookie} from "src/utils/cookieUtil";
import {getProfileImage} from "src/apis/Member";

const FeedReplyAdd =({feedId,feedUser} : IFeedReplyAddProps) => {
    const userId = getCookie('userId');
    return(
        <div className={style.container}>
            <div className={style.img_box}>
                <Image src={getProfileImage(userId,'MID')} className={style.img} width={35} height={35} quality={100}/>
            </div>
            <FeedReplyAddInput feedId={feedId} feedUser={feedUser}/>
        </div>
    );
};

export default FeedReplyAdd;

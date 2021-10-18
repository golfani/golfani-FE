import style from './feedMain.module.css';
import {IFeedContent} from "src/apis/Feed";
import {dateDiff} from "src/utils/dateUtil";
import UserName from "src/components/common/UserName";
import {useRouter} from "next/router";
import Image from 'next/image';
import {getProfileImage} from "src/apis/Member";
import {useState} from "react";

interface IFeedMainProps {
    feed : IFeedContent
}

const FeedMain =({feed} : IFeedMainProps) : JSX.Element => {
    const router = useRouter();
    const feedContent : string[] = feed.content.split('\n');
    const [isMoreContent, setIsMoreContent] = useState(false);

    const onSearchTag = (tag : string) => {
        router.push(`/feed?search=${tag}`);
    }

    const handleClickTag = (tag : string) => {
        onSearchTag(tag);
    }

    const onShowMoreContent = () => {
        setIsMoreContent(true);
    }

    const handleClickMoreContent = () => {
        onShowMoreContent();
    }

    const renderTagList = feed.tag.split("#").map((item,index) => {
        if(index > 0) {
            return (
                <span key={item} className={style.tag_txt} onClick={()=>handleClickTag(item)}>{`#${item}`}</span>
            )
        }
    });

    return (
        <div className={style.container}>
            <div className={style.user_box}>
                <div className={style.img_box}>
                    <Image src={getProfileImage(feed.userId,'MID')} className={style.img} width={35} height={35} quality={100}/>
                </div>
                <div className={style.user_sub_box}>
                    <UserName userName={feed.userId}/>
                    <span className={style.time_txt}>{dateDiff(feed.createdTime)}</span>
                </div>
            </div>
            <div className={style.main_txt}>
                {feedContent.map((text,index)=> {
                    if(isMoreContent || index < 3) {
                        return <span className={style.content_txt} key={index}>{text}</span>
                    }
                })}
                {feedContent.length > 3 && !isMoreContent && <span className={style.content_more_btn} onClick={handleClickMoreContent}>본문 더보기...</span>}
            </div>
            <div className={style.tag_box}>
                {renderTagList}
            </div>
        </div>
    );
};

export default FeedMain;
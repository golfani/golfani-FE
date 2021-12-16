import style from './feedMain.module.css';
import {IFeedContent} from "src/apis/Feed";
import {dateDiff} from "src/utils/dateUtil";
import UserName from "src/components/common/UserName";
import {useState} from "react";
import UserProfileImage from "src/components/common/UserProfileImage";
import useCustomRouter from "src/hooks/routerHook";
import FeedLike from "./FeedLike";
import FeedDetailMenu from "./FeedDetailMenu";

interface IFeedMainProps {
    feed : IFeedContent
}

const FeedMain =({feed} : IFeedMainProps) : JSX.Element => {
    const feedContent : string[] = feed.content.split('\n');
    const [isMoreContent, setIsMoreContent] = useState(false);
    const {onConflictRoute} = useCustomRouter();

    const handleClickTag = (tag : string) => {
        onConflictRoute(`/feed?search=${tag}`);
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
                    <UserProfileImage
                        userId={feed.userId}
                        width={35}
                        height={35}
                    />
                </div>
                <div className={style.user_sub_box}>
                    <UserName userName={feed.userId}/>
                    <span className={style.time_txt}>{dateDiff(feed.createdTime)}</span>
                </div>
                <div className={style.menu_box}>
                    <FeedLike feed={feed}/>
                    <FeedDetailMenu feed={feed}/>
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

import style from './feedMain.module.css';
import * as faker from "faker";
import {IFeedContent} from "src/apis/Feed";
import {dateDiff} from "src/utils/dateUtil";
import UserName from "src/components/common/UserName";

interface IFeedMainProps {
    feed : IFeedContent
}

const FeedMain =({feed} : IFeedMainProps) : JSX.Element => {

    const renderTagList = feed.tag.split("#").map((item,index) => {
        if(index > 0) {
            return (
                <span key={item} className={style.tag_txt}>{`#${item}`}</span>
            )
        }
    });

    return (
        <div className={style.container}>
            <div className={style.user_box}>
                <img className={style.img} src={faker.image.avatar()}/>
                <div className={style.user_sub_box}>
                    <UserName userName={feed.userId}/>
                    <span className={style.time_txt}>{dateDiff(feed.createdTime)}</span>
                </div>
            </div>
            <div className={style.main_txt}>
                {feed.content.split('\n').map((text,index)=> (
                    <span className={style.content_txt} key={index}>{text}</span>
                ))}
            </div>
            <div className={style.tag_box}>
                {renderTagList}
            </div>
        </div>
    );
};

export default FeedMain;
import style from './feedMain.module.css';
import * as faker from "faker";
import {IFeedContent} from "src/apis/Feed";
import {dateDiff} from "src/utils/dateUtil";

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
                    <span className={style.user_id_txt}>{feed.userId}</span>
                    <span className={style.time_txt}>{dateDiff(feed.createdTime)}</span>
                </div>
            </div>
            <div className={style.main_txt}>
                <span>{feed.content}</span>
            </div>
            <div className={style.tag_box}>
                {renderTagList}
            </div>
        </div>
    );
};

export default FeedMain;
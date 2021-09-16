import style from './hotFeed.module.css';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FeedThumbnail from "./FeedThumbnail";
import faker from 'faker';
import {useInfiniteQuery, useQuery} from "react-query";
import {getHotFeed, IFeedContent} from "../../../apis/Feed";
import {IPages} from "../../../domain/Page";

const HotFeed = () : JSX.Element => {
    const hotFeedQuery = useQuery<IPages<IFeedContent>>('hotFeed',()=>getHotFeed(),{
        staleTime : 1000 * 60
    })

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <WhatshotIcon color={"error"} fontSize={"small"}/>
                <span className={style.title_txt}>인기 피드</span>
                <span className={style.more_txt}>더 보러가기</span>
            </div>
            <div className={style.thumbnail_box}>
                {hotFeedQuery.data?.content.map((feed)=> (
                    <FeedThumbnail feed={feed}/>
                ))}
            </div>
        </div>
    );
};

export default HotFeed;
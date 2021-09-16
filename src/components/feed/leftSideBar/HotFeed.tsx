import style from './hotFeed.module.css';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FeedThumbnail from "./FeedThumbnail";
import {useInfiniteQuery, useQuery} from "react-query";
import {getHotFeed, IFeedContent} from "src/apis/Feed";
import {IPages} from "src/domain/Page";
import useFeedType from "src/store/modules/feedType/feedTypeHook";

const HotFeed = () : JSX.Element => {
    const {onChangeHotView} = useFeedType()
    const hotFeedQuery = useInfiniteQuery<IPages<IFeedContent>>('hotFeed',()=>getHotFeed(0,6),{
        staleTime : 1000 * 60 * 10
    })

    const handleClickMoreTxt = () => {
        onChangeHotView();
    }

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <WhatshotIcon color={"error"} fontSize={"small"}/>
                <span className={style.title_txt}>인기 피드</span>
                <span className={style.more_txt} onClick={handleClickMoreTxt}>더 보러가기</span>
            </div>
            <div className={style.thumbnail_box}>
                {
                    hotFeedQuery.data?.pages.map((page)=>(
                        page.content.map((feed)=> (
                            <FeedThumbnail feed={feed}/>
                        ))
                    ))
                }
            </div>
        </div>
    );
};

export default HotFeed;
import style from './myFeed.module.css';
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FeedThumbnail from "./FeedThumbnail";
import {useInfiniteQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getUserFeed, IFeedContent} from "src/apis/Feed";


const userId = "gudwh14"
const MyFeed = () : JSX.Element => {
    const myFeedQuery = useInfiniteQuery<IPages<IFeedContent>>(['userFeed',userId],()=>getUserFeed(0,6,userId),{
        staleTime : 1000 * 60
    })

    const handleClickMoreTxt = () => {
        // Todo 마이페이지 -> 내 피드 모두 보러가기 페이지로 이동
    }

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <WhatshotIcon color={"error"} fontSize={"small"}/>
                <span className={style.title_txt}>내 최근 피드</span>
                <span className={style.more_txt} onClick={handleClickMoreTxt}>더 보러가기</span>
            </div>
            <div className={style.thumbnail_box}>
                {
                    myFeedQuery.data?.pages.map((page)=>(
                        page.content.map((feed)=> (
                            <FeedThumbnail feed={feed}/>
                        ))
                    ))
                }
            </div>
        </div>
    );
};

export default MyFeed;

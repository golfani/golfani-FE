import style from './myFeed.module.css';
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FeedThumbnail from "./FeedThumbnail";
import {useInfiniteQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getUserFeed, IFeedContent} from "src/apis/Feed";
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";


const MyFeed = () : JSX.Element => {
    const userId = getCookie('userId');
    const router = useRouter();
    const myFeedQuery = useInfiniteQuery<IPages<IFeedContent>>(['recentFeed',userId],()=>getUserFeed(0,6,userId),{
        staleTime : 1000 * 60
    })

    const handleClickMoreTxt = () => {
        userId ? router.push(`/profile/${userId}`) : router.push('/login');
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
                    myFeedQuery.data?.pages.map((page)=> {
                        if(page.content.length) {
                            return page.content.map((feed : IFeedContent) => (
                                <FeedThumbnail key={feed.id} feed={feed}/>
                            ))
                        }
                        else {
                            return <span className={style.nothing_show_txt}>피드가 존재하지 않습니다</span>
                        }
                    })
                }
            </div>
        </div>
    );
};

export default MyFeed;

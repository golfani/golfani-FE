import style from './cardList.module.css';
import CardItem from "./CardItem";
import {useInfiniteQuery} from "react-query";
import {getFeed, getHotFeed,IFeedContent} from "src/apis/Feed";
import {IPages} from "src/domain/Page";
import useFeedType from "src/store/modules/feedType/feedTypeHook";

const CardList = () : JSX.Element => {
    const {type} = useFeedType();
    const feedQuery = useInfiniteQuery<IPages<IFeedContent>>('feed',({pageParam = ''})=>getFeed(pageParam,10), {
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60,
        enabled : type === 'CARD'
    })

    const hotFeedQuery = useInfiniteQuery<IPages<IFeedContent>>('hotFeed',({pageParam = '1'})=>getHotFeed(pageParam,10), {
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60 * 10,
        enabled : type === 'HOT'
    })

    console.log(type);
    return (
        <div className={style.container}>
            {type === 'HOT' && <span className={style.hotView_txt}>인기 피드게시물</span>}
            <div className={style.card_container}>
                <div className={style.card_box}>
                    {
                        type === 'CARD' &&
                        feedQuery.data?.pages.map((page)=>(
                            page.content.map((feed)=> (
                                <CardItem key={feed.id} feed={feed}/>
                            ))
                        ))
                    }
                    {
                        type === 'HOT' &&
                        hotFeedQuery.data?.pages.map((page)=>(
                            page.content.map((feed)=> (
                                <CardItem key={feed.id} feed={feed}/>
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CardList;

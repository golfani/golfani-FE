import style from './feedList.module.css';
import FeedItem from "./FeedItem";
import {useInfiniteQuery} from "react-query";
import {getFeed, IFeedContent} from "src/apis/Feed";
import {IPages} from "src/domain/Page";

const FeedList = () : JSX.Element => {
    const {data, fetchNextPage, hasNextPage} = useInfiniteQuery<IPages<IFeedContent>,Error>('feed',({pageParam = ''})=>getFeed(pageParam),{
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            console.log(currentPage);
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined
            }
            return currentPage+1;
        },
        staleTime : 1000 * 10
    })

    return (
        <div className={style.container}>
            <FeedItem pages={data?.pages}/>
        </div>
    )
}

export default FeedList;

import style from './cardList.module.css';
import CardItem from "./CardItem";
import {useInfiniteQuery} from "react-query";
import {getFeed, IFeedContent} from "src/apis/Feed";
import {IPages} from "src/domain/Page";

const CardList = () : JSX.Element => {
    const feedQuery = useInfiniteQuery<IPages<IFeedContent>>('feed',({pageParam = ''})=>getFeed(pageParam,10), {
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60
    })

    console.log(feedQuery.data);
    return (
        <div className={style.container}>
            <div className={style.card_box}>
                {
                    feedQuery.data?.pages.map((page)=>(
                        page.content.map((feed)=> (
                            <CardItem key={feed.id} feed={feed}/>
                        ))
                    ))
                }
            </div>
        </div>
    );
};

export default CardList;

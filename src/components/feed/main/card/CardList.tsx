import style from './cardList.module.css';
import CardItem from "./CardItem";
import {useInfiniteQuery} from "react-query";
import {getFeed, getHotFeed,IFeedContent, getTagSearchFeed} from "src/apis/Feed";
import {IPages} from "src/domain/Page";
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";
import {useEffect} from "react";

const CardList = () : JSX.Element => {
    const {type} = useFeedType();
    const router = useRouter();
    const {search} = router.query;

    // 스크롤 맨위로 이동
    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

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

    const searchFeedQuery = useInfiniteQuery<IPages<IFeedContent>>(['searchFeed',search],({pageParam = ''})=>getTagSearchFeed(pageParam,6,search as string), {
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60 * 10,
        enabled : type === 'SEARCH'
    })

    return (
        <div className={style.container}>
            {type === 'HOT' && <span className={style.titleView_txt}>인기 피드게시물</span>}
            {type === 'SEARCH' && <span className={style.titleView_txt}>{`#${search} 검색결과`}</span>}
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
                    {
                        type === 'SEARCH' &&
                        searchFeedQuery.data?.pages.map((page)=> (
                            page.content.length !== 0
                                ? page.content.map((feed) => (
                                    <CardItem key={feed.id} feed={feed}/>
                                ))
                                : <span key={0} className={style.notFound_txt}>{`#${search} 태그를 가진 게시물이 존재하지 않습니다`}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CardList;

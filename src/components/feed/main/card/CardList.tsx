import style from './cardList.module.css';
import CardItem from "./CardItem";
import {useInfiniteQuery,useQuery} from "react-query";
import {getFeed, getHotFeed,IFeedContent, getTagSearchFeed} from "src/apis/Feed";
import {IPages} from "src/domain/Page";
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useRouter} from "next/router";
import {useEffect, useRef} from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CardList = () : JSX.Element => {
    const {type} = useFeedType();
    const router = useRouter();
    const {search} = router.query;
    const scrollRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();
    const feedQuery = useInfiniteQuery<IPages<IFeedContent>>('cardFeed',({pageParam = ''})=>getFeed(pageParam,0,9), {
        getNextPageParam : (lastPage) => {
            if(lastPage.totalPages <= 1) {
                return undefined;
            }
            return lastPage.content && lastPage.content[lastPage.content.length-1].id;
        },
        staleTime : 1000 * 60,
        enabled : type === 'CARD'
    })

    const hotFeedQuery = useQuery<IFeedContent[]>('hotFeed',()=>getHotFeed(), {
        staleTime : 1000 * 60 * 10,
        enabled : type === 'HOT'
    })

    const searchFeedQuery = useInfiniteQuery<IPages<IFeedContent>>(['searchFeed',search],({pageParam = ''})=>getTagSearchFeed(pageParam,18,search as string), {
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

    const intersectionObserver = (entries : IntersectionObserverEntry[], io : IntersectionObserver) => {
        entries.forEach(async (entry)=> {
            if(entry.isIntersecting) {
                io.unobserve(entry.target);
                if(type === 'CARD') {
                    feedQuery.hasNextPage && await feedQuery.fetchNextPage();
                }
                if(type === 'SEARCH') {
                    searchFeedQuery.hasNextPage && await searchFeedQuery.fetchNextPage();
                }
            }
        })
    }

    // 스크롤 맨위로 이동
    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    useEffect(()=> {
        observer.current = new IntersectionObserver(intersectionObserver);
        scrollRef.current && observer.current?.observe(scrollRef.current);
    },[type,feedQuery.data,searchFeedQuery.data]);

    return (
        <div className={style.container}>
            {type === 'HOT' &&
            <div className={style.hot_box}>
                <FavoriteIcon className={style.hot_icon} style={{fontSize : 22}}/>
                <span className={style.hot_txt}>인기피드</span>
            </div>
            }
            {type === 'SEARCH' &&
                <span className={style.titleView_txt}>
                    {searchFeedQuery.data?.pages[0].totalElements
                        ? `#${search} ${searchFeedQuery.data?.pages[0].totalElements}개 피드`
                        : `#${search} 태그를 가진 게시물이 존재하지 않습니다`
                    }
                </span>
            }
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
                        hotFeedQuery.data?.map((feed) => (
                            <CardItem key={feed.id} feed={feed}/>
                        ))
                    }
                    {
                        type === 'SEARCH' &&
                        searchFeedQuery.data?.pages.map((page)=> (
                            page.content.length !== 0
                                ? page.content.map((feed) => (
                                    <CardItem key={feed.id} feed={feed}/>
                                ))
                                : null
                        ))
                    }
                </div>
            </div>
            <div ref={scrollRef} className={style.scroll_ref}> </div>
        </div>
    );
};

export default CardList;

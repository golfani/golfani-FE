import style from './feedList.module.css';
import FeedItem from "./FeedItem";
import {useInfiniteQuery} from "react-query";
import {getFeed, IFeedContent} from "src/apis/Feed";
import {IPages} from "src/domain/Page";
import {useEffect, useRef} from "react";

const FeedList = () : JSX.Element => {
    const {data, fetchNextPage, hasNextPage} = useInfiniteQuery<IPages<IFeedContent>,Error>('feed',({pageParam = undefined})=>getFeed(pageParam),{
        getNextPageParam : (lastPage) => {
            if(lastPage.totalPages <= 1) {
                return undefined;
            }
            return lastPage.content && lastPage.content[lastPage.content.length-1].id;
        },
        staleTime : 1000 * 10 * 60
    })
    const scrollRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    const intersectionObserver = (entries : IntersectionObserverEntry[], io : IntersectionObserver) => {
        entries.forEach(async (entry)=> {
            if(entry.isIntersecting) {
                io.unobserve(entry.target);
                hasNextPage && await fetchNextPage();
            }
        })
    }

    // 스크롤 맨위로 이동
    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    useEffect(() => {
        observer.current = new IntersectionObserver(intersectionObserver);
        scrollRef.current && observer.current?.observe(scrollRef.current);
    },[data]);

    return (
        <div className={style.container}>
            {data?.pages.map((page)=> (
                page.content.map((feed)=> (
                    <FeedItem feed={feed} isModal={false} key={feed.id}/>
                ))
            ))}
            <div ref={scrollRef} className={style.scroll_ref}> </div>
        </div>
    )
}

export default FeedList;

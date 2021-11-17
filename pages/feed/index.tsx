import style from 'styles/feed.module.css';
import FeedNavBar from "src/components/feed/FeedNavBar";
import FeedLeftSideBar from "src/components/feed/leftSideBar/FeedLeftSideBar";
import FeedMain from "src/components/feed/main/FeedMain";
import {GetServerSideProps} from "next";
import {QueryClient} from "react-query";
import {getFeed, getHotFeed} from "src/apis/Feed";
import {dehydrate} from "react-query/hydration";
import {useRouter} from "next/router";
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import {useEffect} from "react";
import FeedSearch from "src/components/feed/FeedSearch";

const Feed = () : JSX.Element => {
    const router = useRouter();
    const feedType = useFeedType();
    const {search} = router.query;

    useEffect(()=> {
        search
            ? feedType.onChangeSearchView()
            : feedType.type === 'LIST' || feedType.type === 'SEARCH'
                ? feedType.onChangeListView()
                : feedType.onChangeCardView();
    },[search])

    return (
        <div className={style.home_container}>
            {feedType.type === 'MOBILE_SEARCH' ? <FeedSearch/> : <FeedNavBar/> }
            <div className={style.main_container}>
                <FeedLeftSideBar/>
                <FeedMain/>
            </div>
        </div>
    )
};

export const getServerSideProps : GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery('feed',()=>getFeed(),{
        staleTime : 1000 * 60
    });
    await queryClient.prefetchQuery('hotFeed',()=>getHotFeed(),{
        staleTime : 1000 * 60 * 10
    });

    return {
        props : {
            dehydrateState : JSON.parse(JSON.stringify(dehydrate(queryClient)))
        }
    }
}

export default Feed;

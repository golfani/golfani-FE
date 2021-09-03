import style from 'styles/feed.module.css';
import FeedNavBar from "src/components/feed/FeedNavBar";
import FeedLeftSideBar from "src/components/feed/leftSideBar/FeedLeftSideBar";
import FeedMain from "src/components/feed/main/FeedMain";
import {GetServerSideProps} from "next";
import {QueryClient} from "react-query";
import {getFeed} from "src/apis/Feed";
import {dehydrate} from "react-query/hydration";

const Feed = () : JSX.Element => {

    return (
        <div className={style.home_container}>
            <FeedNavBar/>
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

    return {
        props : {
            dehydrateState : JSON.parse(JSON.stringify(dehydrate(queryClient)))
        }
    }
}

export default Feed;

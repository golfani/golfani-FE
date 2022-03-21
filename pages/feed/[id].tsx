import {GetServerSideProps, NextPage} from "next";
import {getFeedOne, IFeedContent} from "src/apis/Feed";
import FeedNavBar from "src/components/feed/FeedNavBar";
import FeedItem from "src/components/feed/main/list/FeedItem";
import Head from "next/head"
import style from 'styles/feed.module.css'
import {useRouter} from "next/router";

interface IFeedViewProps {
    feed: IFeedContent
}

const FeedView: NextPage<IFeedViewProps> = ({feed}) => {
    const router = useRouter();

    const handleClickContent = (type: string) => {
        if (type == 'user') {
            router.push(`/profile/${feed.userId}`);
        } else if (type == 'golfani') {
            router.push('/feed');
        }
    };

    return (
        <div className={style.home_container}>
            <Head>
                <title>{`${feed.userId}님의 피드: ${feed.content}`}</title>
                <meta name="description" content={feed.content}/>
                <meta property="og:title" key="ogtitle" content={`${feed.userId}님의 피드`}/>
                <meta property="og:description" key="ogdesc" content={feed.content}/>
                <meta property="og:url" key="ogurl"
                      content={`https://golfani.com/feed/${feed.id}`}/>
                <meta property="og:image" key="ogimage"
                      content={feed.urlList[0]}/>
            </Head>
            <FeedNavBar/>
            <div className={style.view_container}>
                <FeedItem feed={feed} isModal={false}/>
                <div className={style.content_box}>
                    <button className={style.content_item} onClick={() => handleClickContent('user')}>{feed.userId}님의
                        컨텐츠 더 보러가기
                    </button>
                    <button className={style.content_item} onClick={() => handleClickContent('golfani')}>GOLFANI 컨텐츠 더
                        보러가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<IFeedViewProps> = async (context) => {
    const feedId = context.params?.id;
    const feed = await getFeedOne(Number(feedId));

    return {
        props: {
            feed: feed
        }
    }
}
export default FeedView;

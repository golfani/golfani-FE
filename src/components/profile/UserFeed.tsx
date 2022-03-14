import style from './userFeed.module.css';
import {useQuery} from "react-query";
import {getAllUserFeed, IFeedContent} from "src/apis/Feed";
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import FeedModal from "src/components/modals/feed/FeedModal";
import {useEffect, useState} from "react";
import {MID_LEVEL_FIRST_PICTURE} from "src/domain/Picture";

const UserFeed = ({member} : IProfileMemberProps) : JSX.Element => {
    const userFeedQuery = useQuery<IFeedContent[]>(['userFeed',member.userId],()=>getAllUserFeed(member.userId),{
        staleTime : 60 * 10 * 1000
    });
    const [feedModalOpen, setModalOpen] = useState(false);
    const [feedModalData, setFeedModalData] = useState<IFeedContent>();
    const [imgWidth, setImgWidth] = useState(300);
    const [feedModalId, setFeedModalId] = useState<number>();

    const onSetFeedModalOpen = () => {
        setModalOpen(true);
    }

    const onSetFeedModalData = (feedId : number) => {
        const findFeedData = userFeedQuery.data?.find((feed)=>(
            feed.id === feedId
        ));
        setFeedModalData(findFeedData as IFeedContent);
    }

    const handleClickFeed = (feedId : number) => {
        setFeedModalId(feedId);
        onSetFeedModalOpen();
        onSetFeedModalData(feedId);
    }

    useEffect(()=> {
        const resizeListener = () => {
            if(window.screen.width < 1024) {
                setImgWidth(window.screen.width / 3);
            }
            else if(window.innerWidth < 1024) {
                setImgWidth(window.innerWidth / 3);
            }
            else {
                setImgWidth(300);
            }
        }
        resizeListener();
        window.addEventListener('resize',resizeListener);
        return () => window.removeEventListener('resize',resizeListener);
    },[]);

    useEffect(() => {
        feedModalId && onSetFeedModalData(feedModalId);
    },[userFeedQuery.data])

    return (
        <div className={style.container}>
            {userFeedQuery.data?.map((feed, mIndex)=> {
                if(mIndex % 3 === 0) {
                    return (
                        <div className={style.feed_row_box} key={mIndex}>
                            {userFeedQuery.data.slice(mIndex,mIndex+3).map((nFeed)=> (
                                <div className={style.feed_box} key={nFeed.id} onClick={()=>handleClickFeed(nFeed.id)}>
                                    <img className={style.img} src={nFeed.urlList[MID_LEVEL_FIRST_PICTURE]} width={imgWidth} height={imgWidth}/>
                                </div>
                            ))}
                        </div>
                    )
                }
            })}
            {feedModalOpen && <FeedModal feed={feedModalData!} setModalOpen={setModalOpen}/>}
        </div>
    );
};

export default UserFeed;

import style from './userFeed.module.css';
import {useQuery} from "react-query";
import {getAllUserFeed, IFeedContent} from "src/apis/Feed";
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import FeedModal from "src/components/modals/FeedModal";
import {useState} from "react";
import {MID_LEVEL_FIRST_PICTURE} from "src/domain/Picture";

const UserFeed = ({member} : IProfileMemberProps) : JSX.Element => {
    const userFeedQuery = useQuery<IFeedContent[]>(['userFeed',member.userId],()=>getAllUserFeed(member.userId),{
        staleTime : 6000
    });
    const [feedModalOpen, setModalOpen] = useState(false);
    const [feedModalData, setFeedModalData] = useState<IFeedContent>();

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
        onSetFeedModalOpen();
        onSetFeedModalData(feedId);
    }

    return (
        <div className={style.container}>
            {userFeedQuery.data?.map((feed, mIndex)=> {
                if(mIndex % 3 === 0) {
                    return (
                        <div className={style.feed_row_box} key={mIndex}>
                            {userFeedQuery.data.slice(mIndex,mIndex+3).map((nFeed)=> (
                                <div className={style.feed_box} key={nFeed.id} onClick={()=>handleClickFeed(nFeed.id)}>
                                    <img className={style.img} src={nFeed.urlList[MID_LEVEL_FIRST_PICTURE]} width={300} height={300}/>
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

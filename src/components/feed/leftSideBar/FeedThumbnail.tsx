import style from './feedThumbnail.module.css';
import {IFeedProps} from "src/domain/Feed";
import {useCallback, useState} from "react";
import FeedModal from "../../modals/FeedModal";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import useFeedZIndex from "src/store/modules/feedZIndex/feedZIndexHook";

const FeedThumbnail = ({feed} : IFeedProps) => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);
    const {onSetAbove} = useFeedZIndex();

    const handleClickImage = useCallback(()=> {
        onSetAbove();
        setFeedModalOpen((feedModalOpen)=> true);
    },[feedModalOpen])

    return (
        <div className={style.container}>
            <img className={style.img}
                   src={feed.urlList[LOW_LEVEL_FIRST_PICTURE]}
                   width={100}
                   height={100}
                   onClick={handleClickImage}
            />
            {feedModalOpen && <FeedModal feed={feed} setModalOpen={setFeedModalOpen}/>}
        </div>
    );
};

export default FeedThumbnail;

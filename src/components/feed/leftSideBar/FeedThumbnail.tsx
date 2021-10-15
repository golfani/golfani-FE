import style from './feedThumbnail.module.css';
import {IFeedProps} from "src/domain/Feed";
import Image from "next/image";
import {useCallback, useState} from "react";
import FeedModal from "../../modals/FeedModal";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";

const FeedThumbnail = ({feed} : IFeedProps) => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);

    const handleClickImage = useCallback(()=> {
        setFeedModalOpen((feedModalOpen)=> true);
    },[feedModalOpen])

    return (
        <div className={style.container}>
            <Image className={style.img}
                   src={feed.urlList[LOW_LEVEL_FIRST_PICTURE]}
                   width={100}
                   height={100}
                   onClick={handleClickImage}
            />
            <FeedModal open={feedModalOpen} feed={feed} setOpen={setFeedModalOpen}/>
        </div>
    );
};

export default FeedThumbnail;

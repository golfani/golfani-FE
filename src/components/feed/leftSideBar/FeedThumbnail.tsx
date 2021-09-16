import style from './feedThumbnail.module.css';
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedPicture, getPictureFile, IPictureDto} from "src/apis/Picture";
import Image from "next/image";
import {useCallback, useState} from "react";
import FeedModal from "../../modals/FeedModal";

const FeedThumbnail = ({feed} : IFeedProps) => {
    const [feedModalOpen,setFeedModalOpen] = useState(false);
    const imageQuery = useQuery<IPictureDto[]>(['feedImg',feed.id],()=>getFeedPicture(feed.id), {
        staleTime : 1000 * 60 * 10
    })

    const handleClickImage = useCallback(()=> {
        setFeedModalOpen((feedModalOpen)=> true);
    },[feedModalOpen])

    return (
        <div className={style.container}>
            { imageQuery.data &&
                <Image className={style.img}
                       src={getPictureFile(imageQuery.data[0].path, imageQuery.data[0].filename) as any}
                       width={100}
                       height={100}
                       onClick={handleClickImage}
                />
            }
            <FeedModal open={feedModalOpen} feed={feed} setOpen={setFeedModalOpen}/>
        </div>
    );
};

export default FeedThumbnail;
import style from './feedThumbnail.module.css';
import {ThumbnailFeed} from "./HotFeed";

interface FeedThumbnailProps {
    feeds : ThumbnailFeed[]
}

const FeedThumbnail = ({feeds} : FeedThumbnailProps) => {
    return (
        <div className={style.container}>
            {feeds.map((feed)=>
                <img className={style.img} key={feed.id} src={feed.img} alt={feed.img}/>
                )}
        </div>
    );
};

export default FeedThumbnail;
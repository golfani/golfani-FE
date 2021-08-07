import style from './feedItem.module.css';
import FeedImg from "./FeedImg";
import FeedMain from "./FeedMain";
import FeedReply from "./FeedReply";
import FeedLike from "./FeedLike";
import {useState} from "react";

const FeedItem = () : JSX.Element => {
    const [focus, setFocus] = useState(false);

    const onFocus = () =>{
        setFocus(true);
    }

    return(
        <div className={style.container}>
            <FeedLike/>
            <FeedImg focus={focus}/>
            <FeedMain/>
            <FeedReply onFocus={onFocus}/>
        </div>
    );
};

export default FeedItem;
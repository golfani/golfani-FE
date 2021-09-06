import style from './feedItem.module.css';
import FeedImg from "./FeedImg";
import FeedMain from "./FeedMain";
import FeedReply from "./FeedReply";
import FeedLike from "./FeedLike";
import {useState} from "react";
import {IPages} from "src/domain/Page";
import {IFeedContent} from "src/apis/Feed";

interface IFeedItemProps {
    pages : Array<IPages<IFeedContent>> | undefined
}

const FeedItem = ({pages} : IFeedItemProps) : JSX.Element => {

    return(
        <>
            {pages?.map((page)=> (
                page.content.map((feed)=> (
                    <div className={style.container} key={feed.id}>
                        <FeedLike feed={feed}/>
                        <FeedImg />
                        <FeedMain/>
                        <FeedReply />
                    </div>
                ))
            ))}
        </>
    );
};

export default FeedItem;

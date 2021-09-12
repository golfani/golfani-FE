import style from './feedReply.module.css';
import FeedReplyItem from "./FeedReplyItem";
import FeedReplyAdd from "./FeedReplyAdd";
import {IFeedProps} from "src/domain/Feed";
import {useInfiniteQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getFeedReply, IReplyDto} from "src/apis/Reply";

const FeedReply = ({feed} : IFeedProps) => {
    const replyQuery = useInfiniteQuery<IPages<IReplyDto>,Error>(['feedReply',feed.id],({pageParam = ''}) =>  getFeedReply(feed.id,pageParam), {
        getNextPageParam : (lastPage ) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60
    });

    const handleClickMore = async () => {
        await replyQuery.fetchNextPage();
    }

    return (
        <div className={style.container}>
            {replyQuery.data?.pages.map((page)=> (
                page.content.map((reply)=> (
                    <FeedReplyItem key={reply.id} reply={reply}/>
                ))
            ))}
            {replyQuery.hasNextPage && <span className={style.reply_more_txt} onClick={handleClickMore}>댓글 더보기...</span> }
            <div className={style.divider}></div>
            <FeedReplyAdd feedId={feed.id} refId={null} refUser={null}/>
        </div>
    )
}

export default FeedReply;

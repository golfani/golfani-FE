import style from './feedReply.module.css';
import FeedReplyItem from "./FeedReplyItem";
import FeedReplyAdd from "./FeedReplyAdd";
import {useInfiniteQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getFeedReply, IReplyDto} from "src/apis/Reply";
import {IFeedItemProps} from "./FeedItem";

const FeedReply = ({feed, isModal} : IFeedItemProps) => {
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
            <div className={isModal ? style.reply_main_box : ''}>
                <div className={isModal ? style.reply_box :""}>
                    {
                        replyQuery.data &&
                        replyQuery.data?.pages.map((page)=> (
                        page.content.map((reply)=> (
                            <FeedReplyItem key={reply.id} reply={reply}/>
                        ))
                    ))}
                </div>
                {replyQuery.hasNextPage && <span className={style.reply_more_txt} onClick={handleClickMore}>댓글 더보기...</span> }
            </div>
            {isModal && <span className={style.blank_reply_more_txt}></span>}
            <div className={isModal ? style.modal_reply_input_box : ''}>
                <div className={style.divider}></div>
                <FeedReplyAdd feedId={feed.id} feedUser={feed.userId} refId={null} refUser={null}/>
            </div>
        </div>
    )
}

export default FeedReply;

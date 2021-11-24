import style from 'src/components/board/comment/boardComment.module.css';
import React from 'react';
import BoardCommentItem from "./BoardCommentItem";
import {IBoardProps} from "../view/BoardView";
import {useInfiniteQuery, useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getPostReply, getTotalPostReplies, IReplyDto} from "src/apis/Reply";;
import BoardReplyInputAdd from "./BoardReplyInputAdd";

const BoardComment = ({boardView} : IBoardProps) => {

    const totalReplies = useQuery(['getTotalReplies',boardView.id], () => getTotalPostReplies(boardView.id));
    const replyQuery = useInfiniteQuery<IPages<IReplyDto>,Error>(['postReply', boardView.id],({pageParam = ''}) =>  getPostReply(boardView.id,pageParam), {
        getNextPageParam : (lastPage ) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60
    });

    const moreReply = async () => {
        if(replyQuery.hasNextPage) await replyQuery.fetchNextPage();

    }

    return (
        <div className={style.container}>
            <div className={style.comment_wrap}>
                <div className={style.comment_top}>
                    <div className={style.comment_total}>
                        <span>전체댓글 </span>
                        <span className={style.total_count}>{totalReplies.data}</span>
                        <span>개</span>
                    </div>
                </div>
                <div className={style.comment_box}>
                    {
                        replyQuery.data &&
                        replyQuery.data?.pages.map((page)=>(
                            page.content.map((reply)=>(
                                !reply.isDeleted &&
                                <BoardCommentItem key = {reply.id} reply={reply}/>
                            ))
                        ))
                    }
                    {replyQuery.hasNextPage && <button onClick={moreReply}> 댓글 더보기 </button>}
                    <div className={style.addReply}>
                        <div className={style.divider}> </div>
                        <BoardReplyInputAdd postId={boardView.id} postUser={boardView.userId} refId={null} refUser={null}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;
import style from 'src/components/board/main/comment/boardComment.module.css';
import React from 'react';
import BoardCommentItem from "./BoardCommentItem";
import {IBoardProps} from "../view/BoardView";
import {useInfiniteQuery} from "react-query";
import {IPages} from "../../../../domain/Page";
import {getPostReply, IReplyDto} from "../../../../apis/Reply";;
import BoardReplyInputAdd from "./BoardReplyInputAdd";

const BoardComment = ({boardView} : IBoardProps) => {
    const replyQuery = useInfiniteQuery<IPages<IReplyDto>,Error>(['postReply',boardView.id],({pageParam = ''}) =>  getPostReply(boardView.id,pageParam), {
        getNextPageParam : (lastPage ) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
        staleTime : 1000 * 60
    });

    return (
        <div className={style.container}>
            <div className={style.comment_wrap}>
                <div className={style.comment_top}>
                    <div className={style.comment_total}>
                        <span>전체댓글 </span>
                        <span className={style.total_count}>{boardView.replyCount}</span>
                        <span>개</span>
                    </div>
                </div>
                <div className={style.comment_box}>
                    {
                        replyQuery.data &&
                        replyQuery.data?.pages.map((page)=>(
                            page.content.map((reply)=>(
                                <BoardCommentItem key = {reply.id} reply={reply}/>
                            ))
                        ))
                    }
                    <div>
                        <div className={style.divider}></div>
                        <BoardReplyInputAdd postId={boardView.id} postUser={boardView.userId} refId={null} refUser={null}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;
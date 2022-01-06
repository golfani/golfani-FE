import style from 'src/components/board/comment/boardComment.module.css';
import React, {useEffect, useRef, useState} from 'react';
import BoardCommentItem from "./BoardCommentItem";
import {IBoardProps} from "../view/BoardContent";
import {useInfiniteQuery, useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {getPostAllReply, getPostReply, IReplyDto} from "src/apis/Reply";
import BoardReplyInputAdd from "./BoardReplyInputAdd";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import {EBoardType} from "src/domain/board";

const BoardComment = ({board} : IBoardProps) => {
    const replyQuery = useInfiniteQuery<IPages<IReplyDto>,Error>(['postReply', board.id],({pageParam = ''}) =>  getPostReply(board.id,pageParam), {
        getNextPageParam : (lastPage ) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
    });
    const allReplyQuery = useQuery<IReplyDto[]>(['postAllReply', board.id], () => getPostAllReply(board.id),{
        enabled : board.boardType === EBoardType.ANONYMOUS
    });
    const replyRef = useRef<string[]>([]);
    const [loading, setLoading] = useState(board.boardType !== EBoardType.ANONYMOUS);

    const moreReply = async () => {
        if(replyQuery.hasNextPage) await replyQuery.fetchNextPage();
    }

    useEffect(()=> {
        if(allReplyQuery.data) {
            allReplyQuery.data.map((reply, index)=> {
                if(!reply.isDeleted && reply.userId !== board.userId) {
                    replyRef.current.indexOf(reply.userId) === -1 && replyRef.current.push(reply.userId);
                }
                index === allReplyQuery.data.length - 1 && setLoading(true);
            })
        }
    },[allReplyQuery.data]);

    return (
        <div className={style.container}>
            <div className={style.comment_total_box}>
                <FavoriteBorderIcon style={{fontSize : 16}} className={style.like_icon}/>
                <span className={style.comment_total_txt}>좋아요 {board.likesCount}</span>
                <CloudQueueIcon style={{fontSize : 18}} className={style.comment_icon}/>
                <span className={style.comment_total_txt}>댓글 {board.replyCount}</span>
            </div>
            <div className={style.comment_box}>
                {
                    loading &&
                    replyQuery.data &&
                    replyQuery.data?.pages.map((page)=>(
                        page.content.map((reply)=> {
                            return (!reply.isDeleted &&
                                <BoardCommentItem key={reply.id} reply={reply} board={board} replyRef={replyRef}/>)
                        })
                    ))
                }
                {replyQuery.hasNextPage && <button onClick={moreReply}> 댓글 더보기 </button>}
                <div className={style.addReply}>
                    <div className={style.divider}> </div>
                    <BoardReplyInputAdd postId={board.id} postUser={board.userId}
                                        anonymous={board.boardType === EBoardType.ANONYMOUS}/>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;

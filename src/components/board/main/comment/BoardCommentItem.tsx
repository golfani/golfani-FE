import style from 'src/components/board/main/comment/boardCommentItem.module.css';
import React, {useState} from "react";
import UserName from "src/components/common/UserName";
import {IReplyProps} from "src/domain/Reply";
import BoardReplyInputAdd from "./BoardReplyInputAdd";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deletePostReply, getReply, getTotalReply, IReplyDto} from "src/apis/Reply";
import {getReplyLikes, getUserIsReplyLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportGmailerrorredOutlinedIcon from '@material-ui/icons/ReportGmailerrorredOutlined';
import {useRouter} from "next/router";

const BoardCommentItem = ({reply} : IReplyProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {id} = router.query;
    const [showAdd, setShowAdd] = useState(false);


    const replyLikesQuery = useQuery<ILikesDto>(['replyLikes',reply.id],() => getReplyLikes(reply.id), {
        staleTime : 1000 * 60
    })

    const userIsReplyLikesQuery = useQuery<ILikesDto>(['isReplyLikes',reply.id], () => getUserIsReplyLikes(reply.id), {
        staleTime : 1000 * 60
    })

    const registerLikesMutate = useMutation(()=> registerLikes("REPLY", reply.id));

    const onRegisterLikes = ( async () => {
        try{
            const response = await registerLikesMutate.mutateAsync();
            console.log(response);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await queryClient.invalidateQueries(['replyLikes',reply.id]);
            await queryClient.invalidateQueries(['isReplyLikes',reply.id]);
        }
    })

    const handlerClickLike = async () =>{
        await onRegisterLikes();
    }

    const onDeleteReply = async () => {
        const response = await deletePostReply(reply.id);
        console.log(response);
        await queryClient.invalidateQueries('postReply');
        await queryClient.invalidateQueries('replyQuery');
    }

    const totalReplyQuery = useQuery<number>(['totalReply', reply.id],() => getTotalReply(reply.id), {
        staleTime : 1000 * 60
    })

    const replyQuery = useQuery<IReplyDto[]>(['replyQuery', reply.id], () => getReply(reply.id), {
        staleTime : 1000 * 60
    })

    const onClick = () => {
        setShowAdd(!showAdd);
    }

    return(
        <div className={reply.referenceId ? style.reply_container: style.container}>
            <div className={style.headLine}/>
            <div className={style.comment_main}>
                <div className={style.comment_head}>
                    <UserName userName={reply.userId}/>
                    <span className={style.uploadTime}>{reply.createdTime}</span>
                    <div className={style.right_menu}>
                        {userIsReplyLikesQuery.data?.likes ? <FavoriteIcon style={{fontSize: '1.0rem'}} className={style.like} onClick={handlerClickLike}/> : <FavoriteBorderOutlinedIcon style={{fontSize: '1.0rem'}} className={style.like} onClick={handlerClickLike}/>}
                        <span className={style.likeCount}>{replyLikesQuery.data}</span>
                        <ReportGmailerrorredOutlinedIcon style={{fontSize: '1.0rem'}} className={style.report} onClick={onDeleteReply}/>
                    </div>
                </div>
                <div>
                    <p className={style.comment}>{reply.payload}</p>
                </div>
                <div className={style.reply}>
                    <span>답글 </span>
                    <em>{totalReplyQuery.data}</em>
                    <span>개 </span>
                    <button onClick={onClick}>답글쓰기</button>
                </div>
                <div>
                    {showAdd && <BoardReplyInputAdd postId={reply.postId!} postUser={null} refId={reply.referenceId || reply.id} refUser={reply.userId}/>}
                </div>
                {
                    replyQuery.data?.map((reply) => (
                        !reply.isDeleted &&
                        <BoardCommentItem key = {reply.id} reply={reply}/>
                    ))
                }
            </div>
        </div>
    )
}

export default BoardCommentItem;
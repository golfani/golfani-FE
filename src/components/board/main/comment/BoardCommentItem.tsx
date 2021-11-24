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
import {getCookie} from "src/utils/cookieUtil";
import {toStringByFormatting} from "src/utils/dateUtil";
import ShortcutIcon from '@material-ui/icons/Shortcut';


const BoardCommentItem = ({reply} : IReplyProps) => {
    const userId = getCookie('userId');
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

    const totalReplyQuery = useQuery<number>(['totalReply', reply.id],() => getTotalReply(reply.id), {
        staleTime : 1000 * 60
    })

    const replyQuery = useQuery<IReplyDto[]>(['replyQuery', reply.id], () => getReply(reply.id), {
        staleTime : 1000 * 60
    })

    const onClick = () => {
        setShowAdd(!showAdd);
    }

    const onDeleteReply = async () => {
        try {
            if(userId === reply.userId)
            {
                const response = await deletePostReply(reply.id)
                await queryClient.invalidateQueries(['postReply',Number(id)]);
                await queryClient.invalidateQueries(['replyQuery',reply.referenceId]);
            }
        }
        catch (e) {

        }
    }

    return(
        <div>

            <div className={reply.referenceId ? style.reply_container: style.container}>
                {reply.referenceId && <ShortcutIcon style ={{fontSize: '20px'}} className={style.arrowIcon}/>}
                <div className={style.headLine}/>
                <div className={style.comment_main}>
                    <div className={style.comment_head}>
                        <UserName userName={reply.userId}/>
                        <span className={style.uploadTime}>{toStringByFormatting(reply.createdTime)}</span>
                        <div className={style.right_menu}>
                            {userIsReplyLikesQuery.data?.likes ? <FavoriteIcon style={{fontSize: '1.0rem'}} className={style.like} onClick={handlerClickLike}/> : <FavoriteBorderOutlinedIcon style={{fontSize: '1.0rem'}} className={style.like} onClick={handlerClickLike}/>}
                            <span className={style.likeCount}>{replyLikesQuery.data}</span>
                            <ReportGmailerrorredOutlinedIcon style={{fontSize: '1.0rem'}} className={style.report} onClick={onDeleteReply}/>
                        </div>
                    </div>
                    <div>
                        <p className={style.comment}>{reply.payload}</p>
                    </div>
                    {
                        !reply.referenceId &&
                        <div className={style.reply}>
                            <span>답글 </span>
                            <em>{totalReplyQuery.data}</em>
                            <span>개 </span>
                            <button onClick={onClick}>답글쓰기</button>
                        </div>
                    }
                    <div>
                        {showAdd && <BoardReplyInputAdd postId={reply.postId!} refId={reply.referenceId || reply.id} refUser={reply.userId}/>}
                    </div>
                    {
                        replyQuery.data?.map((reply) => (
                            !reply.isDeleted &&
                            <BoardCommentItem key = {reply.id} reply={reply}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardCommentItem;
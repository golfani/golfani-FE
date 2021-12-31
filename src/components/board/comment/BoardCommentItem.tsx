import style from 'src/components/board/comment/boardCommentItem.module.css';
import React, {useState} from "react";
import UserName from "src/components/common/UserName";
import {IReplyProps} from "src/domain/Reply";
import BoardReplyInputAdd from "./BoardReplyInputAdd";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getReply, IReplyDto} from "src/apis/Reply";
import {getReplyLikes, getUserIsReplyLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {calcPostReplyDate} from "src/utils/dateUtil";
import ShortcutIcon from '@material-ui/icons/Shortcut';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {getProfileImage} from "src/apis/Member";
import DetailMenuModal from "src/components/modals/DetailMenuModal";

const BoardCommentItem = ({reply} : IReplyProps) => {
    const queryClient = useQueryClient();
    const [showReplyAdd, setShowReplyAdd] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const replyLikesQuery = useQuery<ILikesDto>(['replyLikes',reply.id],() => getReplyLikes(reply.id), {
        staleTime : 1000 * 60
    })

    const userIsReplyLikesQuery = useQuery<ILikesDto>(['isReplyLikes',reply.id], () => getUserIsReplyLikes(reply.id), {
        staleTime : 1000 * 60
    })

    const registerLikesMutate = useMutation(()=> registerLikes("REPLY", reply.id));

    const onRegisterLikes = async () => {
        try{
            const response = await registerLikesMutate.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await queryClient.invalidateQueries(['replyLikes',reply.id]);
            await queryClient.invalidateQueries(['isReplyLikes',reply.id]);
        }
    };

    const handleClickLike = async () =>{
        await onRegisterLikes();
    }

    const replyQuery = useQuery<IReplyDto[]>(['replyQuery', reply.id], () => getReply(reply.id), {
        staleTime : 1000 * 60
    })

    const handleClickReplyAddButton = () => {
        setShowReplyAdd(!showReplyAdd);
    }

    const handleClickMenuButton = () => {
        setDetailModalOpen(true);
    }

    const showRefUserTag = () => {
        if(reply.referencedUser && reply.userId !== reply.referencedUser) {
            return (
                <span className={style.tag_user_txt}>{`@${reply.referencedUser}`}</span>
            )
        }
    }

    return (
        <div className={reply.referenceId ? style.reply_container : style.container}>
            {reply.referenceId && <ShortcutIcon style={{fontSize: '20px'}} className={style.arrowIcon}/>}
            <div className={style.comment_main}>
                <div className={style.info_box}>
                    <div className={style.user_box}>
                        <img src={getProfileImage(reply.userId,'MID')} alt={'user_profile'} className={style.user_img}/>
                        <UserName userName={reply.userId} fontSize={14}/>
                    </div>
                    <MoreHorizIcon className={style.menu_icon} onClick={handleClickMenuButton}/>
                </div>
                <div className={style.content_box}>
                    {showRefUserTag()}
                    {
                        reply.payload.split('\n').map((content,index)=> (
                            <span key={index} className={style.content}>{content}</span>
                        ))
                    }
                </div>
                <div className={style.info_box}>
                    <span className={style.date_txt}>{calcPostReplyDate(reply.createdTime)}</span>
                    <div className={style.like_box} onClick={handleClickLike}>
                        {userIsReplyLikesQuery.data?.likes
                            ?
                            <FavoriteIcon style={{fontSize: 12}} className={style.like_icon}/>
                            :
                            <FavoriteBorderOutlinedIcon style={{fontSize: 12}} className={style.like_icon}/>
                        }
                        <span className={style.like_txt}>{replyLikesQuery.data}</span>
                    </div>
                </div>
                <div>
                    <button onClick={handleClickReplyAddButton} className={style.reply_add_btn}>답글쓰기</button>
                    <div>
                        {showReplyAdd &&
                            <BoardReplyInputAdd
                                postId={reply.postId!}
                                refId={reply.referenceId || reply.id}
                                refUser={reply.userId}
                            />
                        }
                    </div>
                </div>
                {
                    replyQuery.data?.map((reply) => (
                        !reply.isDeleted &&
                        <BoardCommentItem key={reply.id} reply={reply}/>
                    ))
                }
            </div>
            {detailModalOpen && <DetailMenuModal setModalOpen={setDetailModalOpen} target={reply} type={'POST_REPLY'}/>}
        </div>
    )
}

export default BoardCommentItem;

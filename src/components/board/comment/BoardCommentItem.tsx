import style from 'src/components/board/comment/boardCommentItem.module.css';
import React, {useEffect, useRef, useState} from "react";
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
import {sendAlarmBySocket} from "src/apis/Alarm";
import {sendFCM} from "src/apis/FirebaseCloudMessage";
import {EBoardType} from "src/domain/board";
import {getCookie} from "src/utils/cookieUtil";

const BoardCommentItem = ({reply, board, replyRef}: IReplyProps) => {
    const userId = getCookie('userId');
    const queryClient = useQueryClient();
    const [showReplyAdd, setShowReplyAdd] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const isAnonymousRef = useRef<boolean>(board?.boardType === EBoardType.ANONYMOUS);
    const [anonymousIndex, setAnonymousIndex] = useState<number>();

    const replyLikesQuery = useQuery<ILikesDto>(['replyLikes', reply.id], () => getReplyLikes(reply.id), {
        staleTime: 1000 * 60
    })

    const userIsReplyLikesQuery = useQuery<ILikesDto>(['isReplyLikes', reply.id], () => getUserIsReplyLikes(reply.id), {
        staleTime: 1000 * 60
    })

    const registerLikesMutate = useMutation(() => registerLikes("REPLY", reply.id));

    const onRegisterLikes = async () => {
        try {
            await registerLikesMutate.mutateAsync();
            try {
                userIsReplyLikesQuery.data || sendAlarmBySocket('LIKES', reply.userId, '댓글을 좋아합니다. ', reply.postId, reply.payload, 'POST_REPLY', reply.id);
                userIsReplyLikesQuery.data || await sendFCM('댓글을 좋아합니다.', reply.userId, false, isAnonymousRef.current);
            } catch (e) {

            }
        } catch (e) {
            console.log(e);
        } finally {
            await queryClient.invalidateQueries(['replyLikes', reply.id]);
            await queryClient.invalidateQueries(['isReplyLikes', reply.id]);
        }
    };

    const handleClickLike = async () => {
        await onRegisterLikes();
    }

    const replyQuery = useQuery<IReplyDto[]>(['replyQuery', reply.id], () => getReply(reply.id), {
        staleTime: 1000 * 60
    })

    const handleClickReplyAddButton = () => {
        setShowReplyAdd(!showReplyAdd);
    }

    const handleClickMenuButton = () => {
        setDetailModalOpen(true);
    }

    const showRefUserTag = () => {
        if (reply.referencedUser && reply.userId !== reply.referencedUser) {
            if (isAnonymousRef.current) {
                return (
                    <span
                        className={style.tag_user_txt}>{`@익명${replyRef?.current?.indexOf(reply.referencedUser)! + 1}`}</span>
                )
            } else {
                return (
                    <span className={style.tag_user_txt}>{`@${reply.referencedUser}`}</span>
                )
            }
        }
    }

    const renderUserText = () => {
        if (isAnonymousRef.current) {
            if (board?.userId === reply.userId) {
                return <span className={style.anonymous_txt}>글쓴이</span>
            } else {
                return <span
                    className={userId === reply.userId ? style.anonymous_me_txt : style.anonymous_txt}>{`익명${anonymousIndex}`}</span>
            }
        } else {
            if (board?.userId === reply.userId) {
                return (
                    <div className={style.flex_box}>
                        <UserName userName={reply.userId} fontSize={14}/>
                        <span className={style.writer_txt}>(글쓴이)</span>
                    </div>)
            } else {
                return <UserName userName={reply.userId} fontSize={14}/>
            }
        }
    }

    useEffect(() => {
        setAnonymousIndex(replyRef?.current?.indexOf(reply.userId)! + 1);
    }, []);

    return (
        <div className={reply.referenceId ? style.reply_container : style.container}>
            {reply.referenceId && <ShortcutIcon style={{fontSize: '20px'}} className={style.arrowIcon}/>}
            <div className={style.comment_main}>
                <div className={style.info_box}>
                    <div className={style.user_box}>
                        {isAnonymousRef.current
                            ?
                            <img src={process.env.NEXT_PUBLIC_DEFAULT_PROFILE} alt={'user_profile'}
                                 className={style.user_img}/>
                            : <img src={getProfileImage(reply.userId, 'MID')} alt={'user_profile'}
                                   className={style.user_img}/>
                        }
                        {renderUserText()}
                    </div>
                    <MoreHorizIcon className={style.menu_icon} onClick={handleClickMenuButton}/>
                </div>
                <div className={board?.userId === reply.userId ? style.writer_content_box : style.content_box}>
                    {showRefUserTag()}
                    {
                        reply.payload.split('\n').map((content, index) => (
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
                            anonymous={isAnonymousRef.current}
                        />
                        }
                    </div>
                </div>
                {
                    replyQuery.data?.map((reply) => (
                        !reply.isDeleted &&
                        <BoardCommentItem key={reply.id} reply={reply} board={board} replyRef={replyRef}/>
                    ))
                }
            </div>
            {detailModalOpen && <DetailMenuModal setModalOpen={setDetailModalOpen} target={reply} type={'POST_REPLY'}/>}
        </div>
    )
}

export default BoardCommentItem;

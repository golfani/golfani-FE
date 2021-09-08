import style from './feedReplyItem.module.css';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {dateDiff} from "src/utils/dateUtil";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import {getReplyLikes, getUserIsReplyLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import {useCallback, useRef, useState} from "react";
import {IReplyProps} from "src/domain/Reply";
import FeedReplyAddInput from "./FeedReplyAddInput";
import {getReply, getTotalReply, IReplyDto} from "src/apis/Reply";
import {handleClickRefOutSide} from "src/utils/clickUtil";


const FeedReplyItem = ({reply} : IReplyProps) => {
    const [showReply , setShowReply] = useState(false);
    const [enableReplyQuery, setEnableReplyQuery] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [isReplyAdd, setIsReplyAdd] = useState(false);
    const queryClient = useQueryClient();
    const replyLikesQuery = useQuery<ILikesDto>(['replyLikes',reply.id],() => getReplyLikes(reply.id), {
        staleTime : 1000 * 60
    })

    const userIsReplyLikesQuery = useQuery<ILikesDto>(['isReplyLikes',reply.id], () => getUserIsReplyLikes("gudwh14",reply.id), {
        staleTime : 1000 * 60
    })

    const replyQuery = useQuery<IReplyDto[]>(['reply',reply.id], () => getReply(reply.id), {
        staleTime : 1000 * 60,
        enabled : enableReplyQuery
    })

    const totalReplyQuery = useQuery<number>(['totalReply', reply.id],() => getTotalReply(reply.id), {
        staleTime : 1000 * 60
    })

    const registerLikesMutate = useMutation(()=> registerLikes("REPLY", reply.id, "gudwh14"));

    const onRegisterLikes = useCallback(async () => {
        try {
            const response = await registerLikesMutate.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await queryClient.invalidateQueries(['isReplyLikes',reply.id]);
            await queryClient.invalidateQueries(['replyLikes',reply.id]);
        }
    },[registerLikesMutate])

    const handleClickLikes = async () => {
        await onRegisterLikes();
    }

    const handleClickAddReply = () => {
        setIsReplyAdd(!isReplyAdd);
    }

    const handleClickShowReply = () => {
        if(!enableReplyQuery) {
            setEnableReplyQuery(true);
        }
        setShowReply(!showReply);
    }

    const showRefUserTag = () => {
        if(reply.referencedUser && reply.userId !== reply.referencedUser) {
            return (
                <span className={style.userTag_txt}>{`@${reply.referencedUser}`}</span>
            )
        }
    }

    const hideReplyAdd = () => {
        setIsReplyAdd(false);
    }

    handleClickRefOutSide(ref,hideReplyAdd);

    return (
        <div className={style.container}>
            <span className={style.user_txt}>{reply.userId}</span>
            <div className={style.reply_content_box} ref={ref}>
                <div className={style.reply_main_box}>
                    <div className={style.text_box}>
                        {showRefUserTag()}
                        <span className={style.reply_txt}>{reply.payload}</span>
                    </div>
                    <span className={style.date_txt}>{(dateDiff(reply.modifiedTime))}</span>
                </div>
                <div className={style.bottom_box}>
                    {reply.referenceId
                        ? <></>
                        : totalReplyQuery.data && <span className={style.show_reply_txt}
                          onClick={handleClickShowReply}>{showReply ? '닫기' : `답글보기(${totalReplyQuery.data})`}</span>
                    }
                    <ReplyRoundedIcon onClick={handleClickAddReply} className={style.reply_icon} color={'primary'}/>
                    {userIsReplyLikesQuery.data?.likes
                        ? <FavoriteIcon onClick={handleClickLikes} className={style.like_icon} color={'error'}/>
                        : <FavoriteBorderOutlinedIcon onClick={handleClickLikes} className={style.like_icon} color={'error'}/>
                    }
                    <span className={style.like_txt}>{replyLikesQuery.data}</span>
                </div>
                {isReplyAdd
                    ?
                    <div className={style.reply_add_box}>
                        <FeedReplyAddInput feedId={reply.feedId} refId={reply.referenceId || reply.id} refUser={reply.userId}/>
                    </div>
                    : <></>
                }
                {showReply && replyQuery.data
                    ? replyQuery.data.map((reply)=> (
                        <FeedReplyItem reply={reply}/>
                    ))
                    : <></>
                }
            </div>
        </div>
    );
};

export default FeedReplyItem;

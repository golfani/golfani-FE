import {dateDiff} from "src/utils/dateUtil";
import style from './alarmItem.module.css';
import {IAlarm} from "src/domain/Alarm";
import UserProfileImage from "src/components/common/UserProfileImage";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {setAlarmRead} from "src/apis/Alarm";
import React, {useCallback, useState} from "react";
import {getFeedOne} from "src/apis/Feed";
import FeedModal from "src/components/modals/feed/FeedModal";
import useFeedZIndex from "src/store/modules/feedZIndex/feedZIndexHook";
import useCustomRouter from "src/hooks/routerHook";
import {getPostOne, IBoardData} from "src/apis/Board";
import {EBoardType} from "src/domain/board";

interface INoticeItemProps {
    alarm : IAlarm
}

const AlarmItem = ({alarm} : INoticeItemProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmMutate = useMutation(()=>setAlarmRead(alarm.id));
    const feedQuery = useQuery(['feed',alarm.feedId],()=>getFeedOne(alarm.feedId!),{
        enabled : alarm.feedId !== null
    });
    const boardQuery = useQuery<IBoardData>(['post',alarm.postId], () => getPostOne(alarm.postId!), {
        enabled : alarm.postId !== null
    });
    const [openFeedModal, setOpenFeedModal] = useState(false);
    const {onSetBelow} = useFeedZIndex()
    const {onConflictRoute} = useCustomRouter();

    const onSetAlarmRead = useCallback(async ()=> {
        try {
            const response = await alarmMutate.mutateAsync();
        }
        catch (e) {

        }
        finally {
            await queryClient.invalidateQueries('alarm');
            await queryClient.invalidateQueries('unReadAlarm');
        }
    },[alarmMutate])

    const onRedirectAlarm = async () => {
        if(alarm.feedId) {
            onSetBelow();
            onSetFeedModal(true);
            await queryClient.invalidateQueries(['feedReply',alarm.feedId]);
            await queryClient.invalidateQueries(['feedLikes',alarm.feedId]);
        }
        if(alarm.postId) {
            await onConflictRoute(`/board/${alarm.postId}?type=${boardQuery.data?.boardType}&page=0`);
        }
    }

    const onSetFeedModal = (state : boolean) => {
        setOpenFeedModal(state);
    }

    const handleClickAlarm = async () => {
        await onSetAlarmRead()
        await onRedirectAlarm();
    }

    const renderProfileImage = () => {
        if (boardQuery.data) {
            if (boardQuery.data.boardType === EBoardType.ANONYMOUS)
                return <img src={process.env.NEXT_PUBLIC_DEFAULT_PROFILE} alt={'user_profile'}
                            className={style.user_img}/>
        }
        return <UserProfileImage height={40} width={40} userId={alarm.sender}/>
    }

    const renderUserNameText = () => {
        if (boardQuery.data) {
            if (boardQuery.data.boardType === EBoardType.ANONYMOUS)
                return <span className={style.userId_txt}>익명</span>
        }
        return <span className={style.userId_txt}>{alarm.sender}</span>
    }

    return (
        <div className={style.container}>
            <div style={{opacity: alarm.isRead ? 0.3 : 1}} className={style.item_box}>
                {
                    renderProfileImage()
                }
                <div className={style.content_box} onClick={handleClickAlarm}>
                    {renderUserNameText()}
                    <span>{alarm.message}</span>
                    {alarm.content && <span className={style.content_txt}>{`"${alarm.content}"`}</span>}
                    <span className={style.date_txt}>{dateDiff(alarm.createdAt)}</span>
                </div>
            </div>
            {openFeedModal && <FeedModal feed={feedQuery.data!} setModalOpen={setOpenFeedModal}/>}
        </div>
    );
};

export default AlarmItem;

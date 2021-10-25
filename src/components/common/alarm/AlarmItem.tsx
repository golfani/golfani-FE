import {dateDiff} from "src/utils/dateUtil";
import style from './alarmItem.module.css';
import {IAlarm} from "src/domain/Alarm";
import {getProfileImage} from "src/apis/Member";
import UserProfileImage from "src/components/common/UserProfileImage";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {setAlarmRead} from "src/apis/Alarm";
import {useCallback, useState} from "react";
import {getFeedOne} from "src/apis/Feed";
import FeedModal from "src/components/modals/FeedModal";

interface INoticeItemProps {
    alarm : IAlarm
}

const AlarmItem = ({alarm} : INoticeItemProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmMutate = useMutation(()=>setAlarmRead(alarm.id));
    const feedQuery = useQuery(['feed',alarm.referId],()=>getFeedOne(alarm.referId),{
        enabled : alarm.alarmType === 'FEED'
    });
    const [openFeedModal, setOpenFeedModal] = useState(false);

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

    const onRedirectAlarm = () => {
        if(alarm.alarmType === "FEED") {
            onSetFeedModal(true);
        }
    }

    const onSetFeedModal = (state : boolean) => {
        setOpenFeedModal(state);
    }

    const handleClickAlarm = async () => {
        await onSetAlarmRead()
        await onRedirectAlarm();
    }

    return (
        <div className={style.container}>
            <div style={{opacity : alarm.isRead ? 0.3 : 1}} className={style.item_box}>
                <UserProfileImage
                    src={getProfileImage(alarm.sender,'MID')}
                    height={40}
                    width={40}
                    userId={alarm.sender}
                />
                <div className={style.content_box} onClick={handleClickAlarm}>
                    <span className={style.userId_txt}>{alarm.sender}</span>
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

import {dateDiff} from "src/utils/dateUtil";
import style from './alarmItem.module.css';
import {IAlarm} from "src/domain/Alarm";
import {getProfileImage} from "src/apis/Member";
import UserProfileImage from "src/components/common/UserProfileImage";
import {useMutation, useQueryClient} from "react-query";
import {setAlarmRead} from "src/apis/Alarm";
import {useCallback} from "react";

interface INoticeItemProps {
    alarm : IAlarm
}

const AlarmItem = ({alarm} : INoticeItemProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmMutate = useMutation(()=>setAlarmRead(alarm.id));

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

    const handleClickAlarm = async () => {
        await onSetAlarmRead()
    }

    return (
        <div style={{opacity : alarm.isRead ? 0.3 : 1}} className={style.container}>
            <UserProfileImage
                src={getProfileImage(alarm.sender,'MID')}
                height={40}
                width={40}
                userId={alarm.sender}
            />
            <div className={style.content_box} onClick={handleClickAlarm}>
                <span className={style.userId_txt}>{alarm.sender}</span>
                <span>{alarm.message}</span>
                <span className={style.content_txt}></span>
                <span className={style.date_txt}>{dateDiff(alarm.createdAt)}</span>
            </div>
        </div>
    );
};

export default AlarmItem;

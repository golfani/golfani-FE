import style from './alarm.module.css';
import AlarmItem from "./AlarmItem";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {getAlarm, setAllAlarmRead} from "src/apis/Alarm";
import {IAlarm} from "src/domain/Alarm";
import {IPages} from "src/domain/Page";

const Alarm = () : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmQuery = useInfiniteQuery<IPages<IAlarm>>('alarm',()=>getAlarm());
    const allAlarmMutate = useMutation(()=>setAllAlarmRead());

    const handleClickAllReadAlarm = async () => {
        try {
            const response = await allAlarmMutate.mutateAsync();
        }
        catch (e) {

        }
        finally {
            await queryClient.invalidateQueries('alarm');
            await queryClient.invalidateQueries('unReadAlarm');
        }
    }

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.title_txt}>알림</span>
                <button className={style.allRead_btn} onClick={handleClickAllReadAlarm}>모두 읽기</button>
            </div>
            {alarmQuery.data?.pages.map((page)=> (
                page.content.map((alarm)=> (
                    <AlarmItem alarm={alarm} key={alarm.id}/>
                ))
            ))}
        </div>
    );
};

export default Alarm;

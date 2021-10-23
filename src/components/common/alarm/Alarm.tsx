import style from './alarm.module.css';
import AlarmItem from "./AlarmItem";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {getAlarm, setAllAlarmRead} from "src/apis/Alarm";
import {IAlarm} from "src/domain/Alarm";
import {IPages} from "src/domain/Page";
import {useEffect, useRef} from "react";
import {isTodayAlarm} from "src/utils/dateUtil";

const Alarm = () : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmQuery = useInfiniteQuery<IPages<IAlarm>>('alarm',({pageParam = ''})=>getAlarm(pageParam),{
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage+1 > lastPage.totalPages) {
                return undefined;
            }
            return currentPage+1;
        },
        staleTime : 6000 * 10,
    });
    const allAlarmMutate = useMutation(()=>setAllAlarmRead());
    const observeRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();
    let isShowPrevAlarm = false;

    useEffect(()=> {
        observer.current = new IntersectionObserver(intersectionObserver);
        observeRef.current && observer.current?.observe(observeRef.current);
    },[])

    const intersectionObserver = (entries : IntersectionObserverEntry[], io : IntersectionObserver) => {
        entries.forEach(async (entry) => {
            if(entry.isIntersecting) {
                await alarmQuery.fetchNextPage();
            }
        })
    }

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
                <button className={style.allRead_btn} onClick={handleClickAllReadAlarm}>모두읽기</button>
            </div>
            <div className={style.item_box}>
            {alarmQuery.data?.pages.map((page,pageIndex)=> (
                page.content.map((alarm, index)=> {
                    if(!isTodayAlarm(alarm.createdAt) && !isShowPrevAlarm) {
                        isShowPrevAlarm = true;
                        return <span key={'prev'} className={style.activity_txt}>이전활동</span>
                    }
                    return (
                        <div key={alarm.id}>
                            {
                                pageIndex === 0 && index === 0 && isTodayAlarm(alarm.createdAt) &&
                                <span className={style.activity_txt}>오늘</span>
                            }
                            <AlarmItem alarm={alarm}/>
                        </div>
                    )
                })
            ))}
            </div>
            <div ref={observeRef}></div>
        </div>
    );
};

export default Alarm;

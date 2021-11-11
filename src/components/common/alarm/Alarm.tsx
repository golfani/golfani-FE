import style from './alarm.module.css';
import AlarmItem from "./AlarmItem";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {getAlarm, setAllAlarmRead} from "src/apis/Alarm";
import {IAlarm} from "src/domain/Alarm";
import {IPages} from "src/domain/Page";
import {useEffect, useRef, useState} from "react";
import {isTodayAlarm} from "src/utils/dateUtil";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {bodyScrollActionForModal} from "src/utils/scrollUtil";

interface IAlarmProps {
    setModalOpen : (state : boolean) => void
}

const Alarm = ({setModalOpen} : IAlarmProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const alarmQuery = useInfiniteQuery<IPages<IAlarm>>('alarm',({pageParam = ''})=>getAlarm(pageParam),{
        getNextPageParam : (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if(currentPage+1 > lastPage.totalPages) {
                return undefined;
            }
            return currentPage+1;
        },
    });
    const allAlarmMutate = useMutation(()=>setAllAlarmRead());
    const observeRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();
    let isShowPrevAlarm = false;
    const [isClose, setIsClose] = useState(false);
    const [slideDiff, setSlideDiff] = useState<number>(0);

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

    const onCloseModal = () => {
        setIsClose(true);
        setTimeout(()=> {
            setModalOpen(false);
        },100);
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

    bodyScrollActionForModal();

    useEffect(()=> {
        let startX : number;
        let startY : number;
        let _diff = 0;
        let startTime : any
        let endTime : any;
        const touchStartEvent = (event : TouchEvent) => {
            startTime = new Date();
            const touchStart = event.touches[0];
            startX = touchStart.clientX;
            startY = touchStart.clientY;
        }
        const touchEndEvent = (event : TouchEvent) => {
            const touchEnd = event.changedTouches[event.changedTouches.length - 1];
            endTime = new Date();
            const diff_time = endTime - startTime;
            if(_diff > 200 || (_diff > 20 && diff_time < 150)) {
                onCloseModal();
            }
            else {
                _diff = 0;
                setSlideDiff(0);
            }
        }
        const touchMoveEvent = (event : TouchEvent) => {
            const touchEnd = event.changedTouches[event.changedTouches.length - 1];
            if(Math.abs(touchEnd.clientY - startY) <= 5) {
                const diff = touchEnd.clientX - startX;
                if(diff > 0) {
                    _diff = diff;
                    setSlideDiff(diff);
                }
            }
        }
        window.addEventListener('touchstart',touchStartEvent);
        window.addEventListener('touchmove',touchMoveEvent);
        window.addEventListener('touchend',touchEndEvent);

        return () => {
            window.removeEventListener('touchstart',touchStartEvent);
            window.removeEventListener('touchend',touchEndEvent);
            window.removeEventListener('touchmove',touchMoveEvent);
        }
    },[])

    return (
        <div className={isClose ? style.container_close : style.container} style={{left : slideDiff}}>
            <div className={style.title_box}>
                <div className={style.back_icon}>
                    <ArrowBackIosNewIcon onClick={onCloseModal}/>
                </div>
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

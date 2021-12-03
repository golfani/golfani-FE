import {RefObject, useEffect} from "react";

/**
 * DIV 바깥 클릭을 감지하여 ACTION 실행
 * @param targetRef
 * @param action
 */
export const handleClickRefOutSide = (targetRef : RefObject<HTMLDivElement>, action : () => void) => {
    useEffect(()=> {
        function handleClickOutside(e: MouseEvent): void {
            if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
                action();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[targetRef])
}

/**
 * DIV 의 Swipe 이벤트를 감지해 ACTION 실행
 * @param ref
 * @param onCloseModal
 * @param setSlideDiff
 */
export const handleModalSwipeEvent = (ref : RefObject<HTMLDivElement>, onCloseModal : () => void, setSlideDiff : (state : number) => void) => {
    useEffect(()=> {
        let startX : number;
        let startY : number;
        let _diff = 0;
        let startTime : any
        let endTime : any;
        let touchTimes : number = 0;
        let isScrollEvent = true;

        const touchStartEvent = (event : TouchEvent) => {
            const target = event.target as HTMLElement;
            if(target.id === 'feed_img' || target.className === 'slick-track') {
                return;
            }
            else {
                event.stopPropagation();
            }
            startTime = new Date();
            const touchStart = event.touches[0];
            startX = touchStart.clientX;
            startY = touchStart.clientY;
        }
        const touchEndEvent = (event : TouchEvent) => {
            endTime = new Date();
            const diff_time = endTime - startTime;
            if(_diff > 200 || (_diff > 20 && diff_time < 150)) {
                onCloseModal();
            }
            else {
                _diff = 0;
                setSlideDiff(0)
                ref.current!.style.overflow = 'auto';
            }
            touchTimes = 0;
            isScrollEvent = true;
        }
        const touchMoveEvent = (event : TouchEvent) => {
            const touchEnd = event.changedTouches[event.changedTouches.length - 1];
            if(touchTimes === 0 && Math.abs(startY - touchEnd.clientY) < 10 && Math.abs(startX - touchEnd.clientX) > 5) {
                isScrollEvent = false;
                ref.current!.style.overflow = 'hidden';
            }
            if(!isScrollEvent) {
                const diff = touchEnd.clientX - startX;
                if(diff > 0) {
                    _diff = diff;
                    setSlideDiff(diff);
                }
            }
            touchTimes ++;
        }
        ref.current?.addEventListener('touchstart',touchStartEvent);
        ref.current?.addEventListener('touchmove',touchMoveEvent);
        ref.current?.addEventListener('touchend',touchEndEvent);

        return () => {
            ref.current?.removeEventListener('touchstart',touchStartEvent);
            ref.current?.removeEventListener('touchend',touchEndEvent);
            ref.current?.removeEventListener('touchmove',touchMoveEvent);
        }
    },[])
}

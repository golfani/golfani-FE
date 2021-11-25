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

export const handleModalSwipeEvent = (onCloseModal : () => void, setSlideDiff : (state : number) => void) => {
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
                setSlideDiff(0);
            }
            touchTimes = 0;
            isScrollEvent = true;
        }
        const touchMoveEvent = (event : TouchEvent) => {
            const touchEnd = event.changedTouches[event.changedTouches.length - 1];
            if(touchTimes === 0 && Math.abs(startY - touchEnd.clientY) < 10) {
                isScrollEvent = false;
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
        window.addEventListener('touchstart',touchStartEvent);
        window.addEventListener('touchmove',touchMoveEvent);
        window.addEventListener('touchend',touchEndEvent);

        return () => {
            window.removeEventListener('touchstart',touchStartEvent);
            window.removeEventListener('touchend',touchEndEvent);
            window.removeEventListener('touchmove',touchMoveEvent);
        }
    },[])
}

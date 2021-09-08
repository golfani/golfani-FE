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

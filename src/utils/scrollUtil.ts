import {useEffect} from "react";

export const bodyScrollActionForModal = () => {
    useEffect(()=> {
        window.document.body.style.overflow = 'hidden';
        return () => {
            window.document.body.style.overflow = 'unset';
        }
    },[])
}

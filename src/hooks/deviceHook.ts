import {useEffect, useState} from "react";

const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|LG|SAMSUNG/i.test(navigator.userAgent));
    }, []);

    return {isMobile}
}

export default useDevice;

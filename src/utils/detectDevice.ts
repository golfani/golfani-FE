/**
 * 모바일 디바이스 판단
 */
export const isMobile = () => {
    if (typeof window !== 'undefined') {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|LG|SAMSUNG/i.test(navigator.userAgent);
    }
    else {
        return false;
    }
}

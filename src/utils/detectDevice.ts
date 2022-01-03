/**
 * 모바일 디바이스 판단
 */
export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|LG|SAMSUNG/i.test(navigator.userAgent);
}

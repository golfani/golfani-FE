// 파일 관련 유틸

/**
 * ObjectUrl to File Convert
 * @param dataUrl
 * @param fileName
 */
export const dataURLtoFile = (dataUrl : string, fileName : string) : File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)!!;
    const bStr = window.atob(arr[1]);
    let n = bStr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type : mime[1]});
}

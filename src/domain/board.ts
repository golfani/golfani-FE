export enum EBoardType {
    HOME = 'HOME',
    TRADE = "TRADE",
    FREE = "FREE",
    TIP = "TIP",
    ANONYMOUS = "ANONYMOUS",
    REVIEW = "REVIEW",
    ASK = "ASK",
    HOT = "HOT",
    ALL = "ALL",
    CATEGORY = "CATEGORY",
    SEARCH = "SEARCH"
}

export type TSelectMenu = 'USER' | 'CONTENT' | 'TITLE';

export const onHandleImgClick = (url : string) => {
    const img = new Image();
    img.onload = () => {
        const popupX = (window.screen.width / 2) - (img.width / 2);
        const popupY = (window.screen.height / 2) - (img.height / 2);
        window.open(img.src, '', `height= ${img.height}, width=${img.width}, left=${popupX}, top=${popupY}, location=no,status=no,scrollbars=yes`);
    }
    img.src = url;
}

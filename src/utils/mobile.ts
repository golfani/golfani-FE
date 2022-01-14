import {getCookie} from "./cookieUtil";

export const userInfoPostMessage = async () => {
    const userInfo = {
        userId : getCookie('userId'),
        refreshToken : getCookie('refreshToken')
    }
    await window.postMessage(userInfo, '*');
}

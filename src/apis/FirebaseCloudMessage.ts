import {securityAxios} from "src/security/axios";
import {getCookie} from "src/utils/cookieUtil";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/fcm`;
const userId = getCookie('userId');

/**
 * FCM 그룹관리 요청 API
 * @param token
 */
export const manageNotificationGroup = async (token : string) => {
    const data = {
        token : token
    }
    const response = await securityAxios.post(`${API_URL}/token`,data);
    return response.data;
}

/**
 * FCM 알람 보내기 요청 API
 * @param msg
 * @param to
 * @param isChat
 */
export const sendFCM = async (msg : string, to : string, isChat : boolean = false, isAnonymous = false) => {
    if (userId === to) return ;

    const formData = new FormData();
    const alarmPrefix = isAnonymous ? '익명님이 ' : `${userId}님이 `;
    const chatPrefix = `${userId}님: `
    formData.append('message', `${isChat ? chatPrefix: alarmPrefix}${msg}`);
    formData.append('to',to);

    const response = await securityAxios.post(`${API_URL}/send`,formData);
    return response.data;
}

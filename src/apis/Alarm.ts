import {securityAxios} from "src/security/axios";
import {TAlarm, TAlarmSendDto} from "src/domain/Alarm";
import {getCookie} from "src/utils/cookieUtil";
import {publishAlarm} from "src/socket/socket";
import {TTarget} from "src/domain/Common";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/alarm`;
const userId = getCookie('userId');

/**
 * 알람리스트를 가져오는 API
 * @param page
 * @param size
 */
export const getAlarm = async (page : number = 0, size : number = 10) => {
    const response = await securityAxios.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 소켓으로 알람을 날려주는 Method
 * @param alarmType
 * @param receiver
 * @param message
 * @param referId
 * @param content
 * @param target
 * @param refReplyId
 */
export const sendAlarmBySocket = (alarmType : TAlarm,
                                  receiver : string,
                                  message : string,
                                  referId : number,
                                  content : string | null = null,
                                  target : TTarget,
                                  refReplyId? : number) => {
    if(receiver !== userId) {
        const msgTemplate = `님이 회원님의`;
        const alarmMessage: TAlarmSendDto = {
            sender: userId,
            receiver: receiver,
            message: `${msgTemplate} ${message}`,
            content: content,
            alarmType: alarmType,
        }

        switch (target) {
            case "FEED":
                alarmMessage.feedId = referId;
                break;
            case "POST":
                alarmMessage.postId = referId;
                break;
            case "REPLY":
                alarmMessage.replyId = referId;
                break;
            case "FEED_REPLY":
                alarmMessage.feedId = referId;
                alarmMessage.replyId = refReplyId;
                break;
            case "POST_REPLY":
                alarmMessage.postId = referId;
                alarmMessage.replyId = referId;
                break;
        }
        publishAlarm(alarmMessage);
    }
    else {
        return ;
    }
}

/**
 * 읽지 않은 알람의 수를 가져오는 API
 */
export const getUnreadAlarmCount = async () => {
    const response = await securityAxios.get(`${API_URL}/unread/${userId}`);
    return response.data;
}

/**
 * 해당 알람을 읽음처리 하는 API
 * @param alarmId
 */
export const setAlarmRead = async (alarmId : number) => {
    const response = await securityAxios.post(`${API_URL}/${alarmId}`);
    return response.data;
}

/**
 * 모든 알람을 읽음처리 하는 API
 */
export const setAllAlarmRead = async () => {
    const response = await securityAxios.post(`${API_URL}/allread/${userId}`);
    return response.data;
}

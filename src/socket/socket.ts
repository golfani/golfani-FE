import {Client, IMessage} from "@stomp/stompjs";
import {getCookie} from "src/utils/cookieUtil";
import {TAlarmSendDto} from "src/domain/Alarm";

const userId = getCookie('userId');
const noticeSubId = 'alarm-sub-id';

export const socket = {
    socketClient : new Client({
        brokerURL : 'wss://golfani.com:8080/stomp',
        debug : (str) => {
        },
        reconnectDelay : 5000,
        heartbeatIncoming : 4000,
        heartbeatOutgoing : 4000,
    })
}

export const socketConnect = (callback : (data : IMessage) => void) => {
    socket.socketClient.onConnect = () => {
        subNoticeChannel(callback);
    }
    socket.socketClient.onDisconnect = () => {
        // Todo
    }
    socket.socketClient.activate();
}

export const subNoticeChannel = (callback : (data : IMessage) => void) => {
    const subscription = socket.socketClient.subscribe(`/queue/${userId}`,callback,{ id : noticeSubId});
}

export const unSubNoticeChannel= () => {
    socket.socketClient.unsubscribe(noticeSubId);
}

export const socketDisconnect = () => {
    socket.socketClient.active && socket.socketClient.deactivate();
}

export const publishAlarm = (payload : TAlarmSendDto) => {
    if (socket.socketClient.active && socket.socketClient.connected) {
        const publish = socket.socketClient.publish({
            destination: `/alarm/${payload.receiver}`,
            body: JSON.stringify(payload),
        });
    }
    else {
        alert('socketClient not Connected');
    }
}

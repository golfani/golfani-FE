import {Client, IMessage, StompHeaders} from "@stomp/stompjs";
import {getCookie} from "src/utils/cookieUtil";
import {TAlarmSendDto} from "src/domain/Alarm";
import {IChatMessageDto} from "../apis/Chat";

const userId = getCookie('userId');
const noticeSubId = 'alarm-sub-id';

interface ISocket {
    socketClient : Client,
    chatRoomId? : number
}

export const socket : ISocket = {
    socketClient : new Client({
        brokerURL: 'wss://golfani.com:8080/stomp',
        debug: (str) => {
        },
        reconnectDelay: 1000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
    }),
    chatRoomId : undefined
}

export const socketConnect = (callback : (data : IMessage) => void, listener : (state : boolean) => void, subChat : () => void) => {
    socket.socketClient.onConnect = async () => {
        await subNoticeChannel(callback);
        await subChat();
        await listener(true);
    }
    socket.socketClient.onDisconnect = () => {
        listener(false);
    }
    socket.socketClient.activate();
}

export const subNoticeChannel = (callback : (data : IMessage) => void) => {
    const subscription = socket.socketClient.subscribe(`/queue/${userId}`,callback,{ id : noticeSubId, type : 'ALARM'});
}

export const subChatChannel = (roomId : number, callback : () => void) => {
    socket.chatRoomId = roomId;
    const subId = `chat-sub-${roomId}`;
    const subscription = socket.socketClient.subscribe(`/topic/${roomId}`,callback,{ id : subId, roomId : roomId.toString(), userId : userId, type : 'CHAT'});
}

export const unSubNoticeChannel= () => {
    socket.socketClient.unsubscribe(noticeSubId);
}

export const unSubChatChannel = (roomId : number) => {
    socket.chatRoomId = undefined;
    const subId = `chat-sub-${roomId}`;
    socket.socketClient.unsubscribe(subId,{roomId : roomId.toString(), userId : userId, type : 'CHAT'});
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

export const publishChatMessage = (payload : IChatMessageDto) => {
    if (socket.socketClient.active && socket.socketClient.connected) {
        const publish = socket.socketClient.publish({
            destination: `/chat/${payload.roomId}`,
            body: JSON.stringify(payload),
        });
    }
    else {
        alert('socketClient not Connected');
    }
}

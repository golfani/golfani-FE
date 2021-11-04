import {getCookie} from "src/utils/cookieUtil";
import {securityAxios} from "src/security/axios";
import {publishChatMessage} from "src/socket/socket";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat`;
const userId = getCookie('userId');

export interface IChatRoomDto {
    id? : number
    memberList : string[]
    lastMessage? : IChatMessageDto
    receiver? : string
    unreadMessageCnt? : number
}

export enum READING_STATUS {
    YES = 'YES',
    NO = 'NO',
}

export interface IChatMessageDto {
    type? : string
    id? : number
    roomId : number
    sender : string
    receiver : string
    message : string
    readingStatus? : READING_STATUS
    createdDate? : Date
}

/**
 * 해당 유저의 채팅방 목록을 요청하는 API
 */
export const getAllChatRooms = async () => {
    const response = await securityAxios.get(`${API_URL}/room/${userId}`);
    return response.data;
}

/**
 * 해당 채팅ROOM 의 채팅 메세지 리스트를 요청하는 API
 * @param roomId
 */
export const getChatMessageByRoomId = async (roomId : number, page : number = 0, size : number = 10) => {
    const response = await securityAxios.get(`${API_URL}/messages/${roomId}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 해당 유저와 개설된 채팅방이 존재하는지 요청하는 API
 * @param receiver
 */
export const getChatRoom = async (receiver : string) => {
    const response = await securityAxios.get(`${API_URL}/user?sender=${userId}&receiver=${receiver}`);
    return response;
}

/**
 * 새로운 채팅방 개설 API
 */
export const createChatRoom = async (receiver : string) => {
    const memberList : string[] = [];
    memberList.push(receiver);
    memberList.push(userId);

    const chatRoomDto : IChatRoomDto = {
        memberList : memberList,
    }
    const response = await securityAxios.post(`${API_URL}/room`,chatRoomDto);
    return response.data;
}

/**
 * 소켓 서버를 통해서 채팅 메세지 발송
 * @param chatRoomId
 * @param receiver
 * @param message
 */
export const sendChatBySocket = async (chatRoomId : number, receiver : string, message : string) => {
    const chatMessageDto : IChatMessageDto = {
        roomId : chatRoomId,
        sender : userId,
        receiver : receiver,
        message : message
    }

    await publishChatMessage(chatMessageDto);
}

/**
 *
 */
export const getUnreadChatMessageCount = async () => {
    const response = await securityAxios.get(`${API_URL}/unread/${userId}`);
    return response.data;
}

/**
 *
 * @param roomId
 */
export const setChatMessageRead = async (roomId : number) => {
    const response = await securityAxios.post(`${API_URL}/read/${roomId}`);
    return response.data;
}

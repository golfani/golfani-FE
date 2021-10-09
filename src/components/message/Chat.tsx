import style from './chat.module.css';
import * as faker from "faker";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";

export interface IChat {
    chatRoomId : number
    chatId : number
    userId : string
    msg : string
    targetId : string
    date : Date
    read : boolean
}

export const chatData : IChat [] = [
    {
        chatRoomId : 1,
        chatId : 1,
        userId : 'admin',
        msg : '안녕하세요!',
        targetId : 'gudwh14',
        date : new Date(),
        read : true
    },
    {
        chatRoomId : 1,
        chatId : 2,
        userId : 'admin',
        msg : '용준이 여자친구 북에서온 리지원입니다.',
        targetId : 'gudwh14',
        date : new Date(),
        read : true
    },
    {
        chatRoomId : 1,
        chatId : 3,
        userId : 'gudwh14',
        msg : '안녕하세요~',
        targetId : 'admin',
        date : new Date(),
        read : false
    },
    {
        chatRoomId : 1,
        chatId : 4,
        userId : 'admin',
        msg : '용준이 여자친구 북에서온 리지원입니다.',
        targetId : 'gudwh14',
        date : new Date(),
        read : true
    },
    {
        chatRoomId : 1,
        chatId : 5,
        userId : 'gudwh14',
        msg : '반갑습니다 ㅎㅎ',
        targetId : 'admin',
        date : new Date(),
        read : false
    },
]

const Chat = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.chat_title_box}>
                <img src={faker.image.avatar()} className={style.title_img}/>
                <span className={style.title_userId_txt}>gudwh14</span>
            </div>
            <div className={style.chat_box}>
                {chatData.map((chat) => (
                    <ChatItem key={chat.chatId} chat={chat}/>
                ))}
            </div>
            <ChatInput/>
        </div>
    );
};

export default Chat;

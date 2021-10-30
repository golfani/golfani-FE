import style from './messageSend.module.css';
import {getProfileImage, IMember} from "src/apis/Member";
import {ChangeEvent, useRef, useState} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {createChatRoom, getChatRoom, sendChatBySocket} from "src/apis/Chat";

interface IMessageSendProps {
    member : IMember
}

const MessageSend = ({member} : IMessageSendProps) : JSX.Element => {
    const userId = getCookie('userId');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [chatText,setChatText] = useState("");

    const handleResizeHeight = () => {
        if(textAreaRef.current) {
            textAreaRef.current.style.height = '30px';
            textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px";
        }
    }

    const handleChangeTextArea = (event : ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setChatText(input.value);
        handleResizeHeight();
    }

    const getChatRoomId = async () => {
        try {
            const response = await getChatRoom(member.userId);
            const roomId = response.data;
            return roomId;
        }
        catch (e) {
            if(e.response.status === 404) {
                const roomId = await createChatRoom(member.userId);
                return roomId;
            }
        }
    }

    const sendMessage = async () => {
        try {
            const roomId = await getChatRoomId();
            await sendChatBySocket(roomId,member.userId,chatText);
            setChatText('');
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleClickSendButton = async () => {
        await sendMessage()
    }


    return (
        <div className={style.container}>
            <div className={style.user_box}>
                <img className={style.img} src={getProfileImage(userId,'MID')} width={30} height={30}/>
                <span className={style.user_txt}>{userId}</span>
            </div>
            <textarea className={style.msg_input}
                      ref={textAreaRef}
                      value={chatText}
                      onChange={handleChangeTextArea}
                      placeholder={"메세지를 입력하세요"}
            />
            <div className={style.send_box}>
                <img className={style.img} src={getProfileImage(member.userId,'MID')} width={30} height={30}/>
                <span className={style.receiver_user}>{`${member.userId}`}</span>
                <button className={style.msg_send_btn} onClick={handleClickSendButton}> </button>
            </div>
        </div>
    );
};

export default MessageSend;

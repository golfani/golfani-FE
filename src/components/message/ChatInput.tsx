import style from './chatInput.module.css';
import React, {ChangeEvent, useRef, useState} from "react";
import {sendChatBySocket} from "src/apis/Chat";
import useChatRoom from "src/store/modules/chat/chatRoomHook";

interface IChatInput {
    setIsSendBySelf : (state : boolean) => void
}

const ChatInput = ({setIsSendBySelf} : IChatInput) : JSX.Element => {
    const [chatInputText, setChatInputText] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const chatRoom = useChatRoom();

    const handleResizeHeight = () => {
        if(textAreaRef.current) {
            textAreaRef.current.style.height = '30px';
            textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px";
        }
    }

    const handleChangeTextArea = (event : ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setChatInputText(input.value);
        handleResizeHeight();
    }

    const onSendMsg = async () => {
        await sendChatBySocket(chatRoom.activeChatRoom?.id!,chatRoom.activeChatRoom?.receiver!,chatInputText);
        await setChatInputText("");
    }

    const handleKeyPress = async (event : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter' && chatInputText) {
            if(!event.shiftKey) {
                event.preventDefault();
                await onSendMsg();
                await setIsSendBySelf(true);
            }
        }
        else if(event.key === 'Enter') {
            if(!event.shiftKey) {
                event.preventDefault();
            }
        }
    }

    const handleClickSendButton = async () => {
        await onSendMsg();
    }

    return (
        <div className={style.container}>
            <div className={style.form}>
                <textarea className={style.input}
                          value={chatInputText}
                          onChange={handleChangeTextArea}
                          onKeyPress={handleKeyPress}
                          ref={textAreaRef}
                />
                <button className={style.send_button} disabled={!chatInputText.trim()} onClick={handleClickSendButton}>전송</button>
            </div>
        </div>
    );
};

export default ChatInput;

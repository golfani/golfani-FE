import style from './chatInput.module.css';
import React, {ChangeEvent, useRef, useState} from "react";
import {IChatRoomDto, sendChatBySocket} from "src/apis/Chat";
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

interface IChatInput {
    setIsSendBySelf: (state: boolean) => void
    chatRoom: IChatRoomDto
}

const ChatInput = ({setIsSendBySelf, chatRoom}: IChatInput): JSX.Element => {
    const [chatInputText, setChatInputText] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleResizeHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '40px';
            textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px";
        }
    }

    const handleChangeTextArea = (event: ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setChatInputText(input.value);
        handleResizeHeight();
    }

    const onSendMsg = async () => {
        try {
            await setChatInputText("");
            await sendChatBySocket(chatRoom.id!, chatRoom.receiver!, chatInputText);
        } catch (e) {

        } finally {

        }
    }

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (window.innerWidth <= 768) {
            return;
        }
        if (event.key === 'Enter' && chatInputText.replace(/\s/g, '').length) {
            if (!event.shiftKey) {
                event.preventDefault();
                await onSendMsg();
                await handleResizeHeight();
                await setIsSendBySelf(true);
            }
        } else if (event.key === 'Enter') {
            if (!event.shiftKey) {
                event.preventDefault();
            }
        }
    }

    const handleClickSendButton = async () => {
        textAreaRef.current?.focus();
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
                {chatInputText.replace(/\s/g, '').length
                    ?
                    <div className={style.icon_box} onClick={handleClickSendButton}>
                        <ArrowUpwardRoundedIcon/>
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
};

export default ChatInput;

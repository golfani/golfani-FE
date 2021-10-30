import style from './chat.module.css';
import ChatInput from "./ChatInput";
import {useEffect, useRef, useState} from "react";
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {useInfiniteQuery, useQueryClient} from "react-query";
import {getChatMessageByRoomId, IChatMessageDto} from "src/apis/Chat";
import {IPages} from "src/domain/Page";
import {getProfileImage} from "src/apis/Member";
import ChatItem from "./ChatItem";

const Chat = () : JSX.Element => {
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const chatRoom = useChatRoom();
    const chatMessageQuery = useInfiniteQuery<IPages<IChatMessageDto>>(['chatMessage',chatRoom.activeChatRoom?.id],
        ()=>getChatMessageByRoomId(chatRoom.activeChatRoom?.id!,0,20), {
            enabled : chatRoom.activeChatRoom?.id !== undefined,
            staleTime : 6000 * 10
        })
    const queryClient = useQueryClient();
    const [isSendBySelf, setIsSendBySelf] = useState(false);

    const chatScrollDown = () => {
        chatScrollRef.current?.scrollIntoView({ block: 'end', inline: 'nearest'});
    }

    useEffect(()=> {
        isSendBySelf && chatScrollDown();
        setIsSendBySelf(false);
        const chatRoomInvalidate = async () => {
            await queryClient.invalidateQueries('chatRoom');
        }
        chatRoomInvalidate();
    },[chatMessageQuery.data]);

    return (
        <div className={style.container}>
            <div className={style.chat_title_box}>
                {chatRoom.activeChatRoom &&
                <img src={getProfileImage(chatRoom.activeChatRoom?.receiver,'MID')} className={style.title_img}/>
                }
                <span className={style.title_userId_txt}>{chatRoom.activeChatRoom?.receiver}</span>
            </div>
            <div className={style.chat_box}>
                {
                    chatMessageQuery.data?.pages.map((page) => (
                        page.content.map((chat,index) => (
                            <ChatItem key={chat.id} chat={chat} chatData={page.content} index={index}/>
                        ))
                    ))
                }
                <div ref={chatScrollRef}></div>
            </div>
            <ChatInput setIsSendBySelf={setIsSendBySelf}/>
        </div>
    );
};

export default Chat;

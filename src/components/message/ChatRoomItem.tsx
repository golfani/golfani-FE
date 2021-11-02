import style from './chatRoomItem.module.css';
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {IChatRoomDto, setChatMessageRead} from "src/apis/Chat";
import {getProfileImage} from "src/apis/Member";
import {dateDiff} from "src/utils/dateUtil";
import {useMutation, useQueryClient} from "react-query";
import {subChatChannel, unSubChatChannel} from "src/socket/socket";
import {useEffect} from "react";

interface IChatRoomItemProps {
    chatRoomItem : IChatRoomDto
}

const ChatRoomItem = ({chatRoomItem} : IChatRoomItemProps) : JSX.Element => {
    const chatRoom = useChatRoom();
    const queryClient = useQueryClient();
    const chatMessageMutate = useMutation(()=> setChatMessageRead(chatRoomItem.id!));

    const callback = async () => {
        await queryClient.invalidateQueries(['chatMessage',chatRoomItem.id]);
    }

    const onReadChatMessage = async () => {
        try {
            const response = await chatMessageMutate.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await queryClient.invalidateQueries('chatRoom');
        }
    }

    const handleClickChatRoom = async () => {
        await onReadChatMessage();
        await queryClient.invalidateQueries('unReadMessage');
        chatRoomItem.id && unSubChatChannel(chatRoomItem.id);
        chatRoom.onSetChatRoomId(chatRoomItem);
        chatRoomItem.id !== chatRoom.activeChatRoom?.id && await subChatChannel(chatRoomItem.id!,callback);
    }

    const unMount = () => {
        unSubChatChannel(chatRoomItem.id!);
        chatRoom.onInitChatRoom();
    }

    useEffect(()=> {
        return () => unMount();
    },[])

    return (
        <div className={chatRoomItem.id === chatRoom.activeChatRoom?.id ? style.container_active : style.container} onClick={handleClickChatRoom}>
            <img src={getProfileImage(chatRoomItem.receiver, 'MID')} className={style.img}/>
            <div className={style.content_box}>
                <div className={style.content_title_box}>
                    <span className={style.userId_txt}>{chatRoomItem.receiver}</span>
                    <span className={style.time_txt}>{dateDiff(chatRoomItem.lastMessage?.createdDate!)}</span>
                </div>
                <div className={style.content_message_box}>
                    <span className={style.message_txt}>{chatRoomItem.lastMessage?.message}</span>
                    {chatRoomItem.unreadMessageCnt! > 0 && <span className={style.notice_icon}>{chatRoomItem.unreadMessageCnt}</span> }
                </div>
            </div>
        </div>
    );
};

export default ChatRoomItem;

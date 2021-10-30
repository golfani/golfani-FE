import style from './chatRoomItem.module.css';
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {IChatRoomDto} from "src/apis/Chat";
import {getProfileImage} from "src/apis/Member";
import {dateDiff} from "src/utils/dateUtil";
import {useQueryClient} from "react-query";
import {subChatChannel, unSubChatChannel} from "src/socket/socket";
import {useEffect} from "react";

interface IChatRoomItemProps {
    chatRoomItem : IChatRoomDto
}

const ChatRoomItem = ({chatRoomItem} : IChatRoomItemProps) : JSX.Element => {
    const chatRoom = useChatRoom();
    const queryClient = useQueryClient();

    const callback = async () => {
        await queryClient.invalidateQueries(['chatMessage',chatRoomItem.id]);
    }

    const handleClickChatRoom = async () => {
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
                    <span className={style.notice_icon}>1</span>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomItem;

import style from './chatRoomList.module.css';
import ChatRoomItem from "./ChatRoomItem";
import {useQuery} from "react-query";
import {getAllChatRooms, IChatRoomDto} from "src/apis/Chat";
import ChatModal from "../modals/ChatModal";
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {useEffect, useState} from "react";
import {unSubChatChannel} from "src/socket/socket";

const ChatRoomList = () : JSX.Element => {
    const chatRoomQuery = useQuery<IChatRoomDto[]>('chatRoom',()=>getAllChatRooms(),{
        staleTime : 6000 * 10
    });
    const chatRoom = useChatRoom();
    const [chatModalOpen , setChatModalOpen] = useState(false);

    chatRoomQuery.data?.sort((prev,cur) => {
        if(prev.lastMessage?.createdDate! > cur.lastMessage?.createdDate!) {
            return -1;
        }
        if(prev.lastMessage?.createdDate! > cur.lastMessage?.createdDate!) {
            return 1;
        }
        else {
            return 0;
        }
    });

    const closeModal = async () => {
        await chatRoom.activeChatRoom && unSubChatChannel(chatRoom.activeChatRoom?.id!);
        await chatRoom.onInitChatRoom();
        await setChatModalOpen(false);
    }

    useEffect(() => {
        if(chatRoom.activeChatRoom && window.innerWidth <= 768) {
            setChatModalOpen(true);
        }
    },[chatRoom.activeChatRoom])

    return (
        <div className={style.container}>
            <span className={style.chatRoom_title_txt}>메세지</span>
            {!chatRoomQuery.data?.length && <span className={style.chatRoom_empty_txt}>도착한 메세지가 없습니다</span>}
            <div className={style.chatItem_box}>
                {chatRoomQuery.data?.map((chatRoom)=>(
                        <ChatRoomItem key={chatRoom.id} chatRoomItem={chatRoom}/>
                    )
                )}
            </div>
            {chatModalOpen && <ChatModal closeModal={closeModal}/>}
        </div>
    );
};

export default ChatRoomList;

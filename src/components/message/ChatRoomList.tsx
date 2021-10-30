import style from './chatRoomList.module.css';
import ChatRoomItem from "./ChatRoomItem";
import {useQuery} from "react-query";
import {getAllChatRooms, IChatRoomDto} from "src/apis/Chat";

const ChatRoomList = () : JSX.Element => {
    const chatRoomQuery = useQuery<IChatRoomDto[]>('chatRoom',()=>getAllChatRooms(),{
        staleTime : 6000 * 10
    });

    return (
        <div className={style.container}>
            <span className={style.chatRoom_title_txt}>채팅목록</span>
            <div className={style.chatItem_box}>
                {chatRoomQuery.data?.map((chatRoom)=>(
                        <ChatRoomItem key={chatRoom.id} chatRoomItem={chatRoom}/>
                    )
                )}
            </div>
        </div>
    );
};

export default ChatRoomList;

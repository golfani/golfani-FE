import style from './chatRoomItem.module.css';
import * as faker from "faker";
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {IChatRoomItem} from "./ChatRoomList";

interface IChatRoomItemProps {
    chatRoomItem : IChatRoomItem
}

const ChatRoomItem = ({chatRoomItem} : IChatRoomItemProps) : JSX.Element => {
    const chatRoom = useChatRoom();

    const handleClickChatRoom = () => {
        chatRoom.onSetChatRoomId(chatRoomItem.id);
    }

    return (
        <div className={chatRoomItem.id === chatRoom.activeId ? style.container_active : style.container} onClick={handleClickChatRoom}>
            <img src={faker.image.avatar()} className={style.img}/>
            <div className={style.content_box}>
                <div className={style.content_title_box}>
                    <span className={style.userId_txt}>gudwh14</span>
                    <span className={style.time_txt}>1일전</span>
                </div>
                <div className={style.content_message_box}>
                    <span className={style.message_txt}>안녕하세요!</span>
                    <span className={style.notice_icon}>1</span>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomItem;

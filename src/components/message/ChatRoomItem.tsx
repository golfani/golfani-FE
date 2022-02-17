import style from './chatRoomItem.module.css';
import {IChatRoomDto} from "src/apis/Chat";
import {getProfileImage} from "src/apis/Member";
import {dateDiff} from "src/utils/dateUtil";
import {useRouter} from "next/router";

interface IChatRoomItemProps {
    chatRoomItem: IChatRoomDto
}

const ChatRoomItem = ({chatRoomItem}: IChatRoomItemProps): JSX.Element => {
    const router = useRouter();
    const roomId = Number(router.query.roomId);

    const handleClickChatRoom = async () => {
        router.push(`/message/${chatRoomItem.id}`);
    }

    return (
        <div className={chatRoomItem.id === roomId ? style.container_active : style.container}
             onClick={handleClickChatRoom}>
            <img alt='profile' src={getProfileImage(chatRoomItem.receiver, 'MID')} className={style.img}/>
            <div className={style.content_box}>
                <div className={style.content_title_box}>
                    <span className={style.userId_txt}>{chatRoomItem.receiver}</span>
                    <span className={style.time_txt}>{dateDiff(chatRoomItem.lastMessage?.createdDate!)}</span>
                </div>
                <div className={style.content_message_box}>
                    <span className={style.message_txt}>{chatRoomItem.lastMessage?.message}</span>
                    {chatRoomItem.unreadMessageCnt! > 0 &&
                    <span className={style.notice_icon}>{chatRoomItem.unreadMessageCnt}</span>}
                </div>
            </div>
        </div>
    );
};

export default ChatRoomItem;

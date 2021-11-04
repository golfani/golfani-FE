import style from './messageMain.module.css';
import ChatRoomList from "./ChatRoomList";
import Chat from "./Chat";

const MessageMain = () : JSX.Element => {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <ChatRoomList/>
                <div className={style.chat_box}>
                    <Chat/>
                </div>
            </div>
        </div>
    );
};

export default MessageMain;

import style from './messageMain.module.css';
import ChatRoomList from "./ChatRoomList";
import Chat from "./Chat";

const MessageMain = () : JSX.Element => {

    return (
        <div className={style.container}>
            <div className={style.box}>
                <ChatRoomList/>
                <Chat/>
            </div>
        </div>
    );
};

export default MessageMain;

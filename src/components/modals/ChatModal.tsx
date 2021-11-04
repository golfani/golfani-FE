import style from './chatModal.module.css';
import Chat from "../message/Chat";

interface IChatModalProps {
    closeModal : () => void
}

const ChatModal = (props : IChatModalProps) : JSX.Element => {
    return (
        <div className={style.modal}>
            <div className={style.chat_box}>
                <Chat closeModal={props.closeModal}/>
            </div>
        </div>
    );
};

export default ChatModal;

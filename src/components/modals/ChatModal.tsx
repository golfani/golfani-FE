import style from './chatModal.module.css';
import Chat from "../message/Chat";
import {bodyScrollActionForModal} from "src/utils/scrollUtil";

interface IChatModalProps {
    closeModal : () => void
}

const ChatModal = (props : IChatModalProps) : JSX.Element => {

    bodyScrollActionForModal();

    return (
        <div className={style.modal}>
            <div className={style.chat_box}>
                <Chat closeModal={props.closeModal}/>
            </div>
        </div>
    );
};

export default ChatModal;

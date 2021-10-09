import style from './chatItem.module.css';
import * as faker from "faker";
import {chatData, IChat} from "./Chat";
import BoltIcon from '@material-ui/icons/Bolt';
import {getCookie} from "src/utils/cookieUtil";

interface IChatItemProps {
    chat : IChat
}

const ChatItem = ({chat} : IChatItemProps) : JSX.Element => {
    const userId = getCookie('userId');

    const isFirstChat = () => {
        const prevId = chat.chatId-2;
        if(chatData[prevId]) {
            if(chat.userId === chatData[prevId].userId && chat.date.toDateString() === chatData[prevId].date.toDateString()) {
                return false;
            }
        }
        return true;
    }

    const isLastChat = () => {
        const nextId = chat.chatId;
        if(chatData[nextId]) {
            if(chat.userId === chatData[nextId].userId && chat.date.toDateString() === chatData[nextId].date.toDateString()) {
                return false;
            }
        }
        return true;
    }

    return (
        <div className={style.container}>
            <div className={style.flex_box}>
                {chat.userId === userId ?
                    <div className={style.my_message_box}>
                        <div className={style.message_sub_box}>
                            <BoltIcon className={style.read_icon} fontSize={'inherit'}/>
                            {isLastChat() &&
                            <span className={style.my_time_txt}>{chat.date.toDateString()}</span>
                            }
                        </div>
                        <span className={style.my_message_txt}>{chat.msg}</span>
                    </div>
                    :
                    <div className={style.flex_box}>
                        {isFirstChat() ?
                            <img className={style.img} src={faker.image.avatar()}/>
                            :
                            <div className={style.blank_img}></div>
                        }
                        <div className={style.message_box}>
                            <span className={style.message_txt}>{chat.msg}</span>
                            <div className={style.message_sub_box}>
                                {isLastChat() &&
                                <span className={style.time_txt}>{chat.date.toDateString()}</span>
                                }
                                <BoltIcon className={style.read_icon} fontSize={'inherit'}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {isLastChat() &&
            <div className={style.divider}></div>
            }
        </div>
    );
};

export default ChatItem;

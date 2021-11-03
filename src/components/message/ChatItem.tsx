import style from './chatItem.module.css';
import BoltIcon from '@material-ui/icons/Bolt';
import {getCookie} from "src/utils/cookieUtil";
import {calcChatDate, toStringByFormatting} from "src/utils/dateUtil";
import {IChatMessageDto, READING_STATUS} from "src/apis/Chat";
import {getProfileImage} from "src/apis/Member";

interface IChatItemProps {
    chatData : IChatMessageDto[]
    chat : IChatMessageDto
    index : number
}

const ChatItem = ({chat,chatData,index} : IChatItemProps) : JSX.Element => {
    const userId = getCookie('userId');
    const message : string[] = chat.message.split('\n');

    const renderShowMessage = message.map((data)=> (
        <div>{data}</div>
    ));

    const isFirstChat = () => {
        const prevId = index-1;
        if(chatData[prevId]) {
            if(chat.sender === chatData[prevId].sender && toStringByFormatting(chat.createdDate!) === toStringByFormatting(chatData[prevId].createdDate!)) {
                return false;
            }
        }
        return true;
    }

    const isLastChat = () => {
        const nextId = index+1;
        if(chatData[nextId]) {
            if(chat.sender === chatData[nextId].sender && toStringByFormatting(chat.createdDate!) === toStringByFormatting(chatData[nextId].createdDate!)) {
                return false;
            }
        }
        return true;
    }

    return (
        <div className={style.container}>
            <div className={style.flex_box}>
                {chat.sender === userId ?
                    <div className={style.my_message_box}>
                        <div className={style.message_sub_box}>
                            {chat.readingStatus === READING_STATUS.NO &&
                            <BoltIcon className={style.read_icon} fontSize={'inherit'}/>
                            }
                            {isLastChat() &&
                            <span className={style.my_time_txt}>{calcChatDate(chat.createdDate!)}</span>
                            }
                        </div>
                        <div className={style.my_message_txt}>
                            {renderShowMessage}
                        </div>
                    </div>
                    :
                    <div className={style.flex_box}>
                        {isFirstChat() ?
                            <img className={style.img} src={getProfileImage(chat.sender,'MID')}/>
                            :
                            <div className={style.blank_img}></div>
                        }
                        <div className={style.message_box}>
                            <div className={style.message_txt}>
                                {renderShowMessage}
                            </div>
                            <div className={style.message_sub_box}>
                                {isLastChat() &&
                                <span className={style.time_txt}>{calcChatDate(chat.createdDate!)}</span>
                                }
                                {chat.readingStatus === READING_STATUS.NO &&
                                <BoltIcon className={style.read_icon} fontSize={'inherit'}/>
                                }
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

import style from "./navbarMenu.module.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import Alarm from "src/components/common/alarm/Alarm";
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {getCookie} from "src/utils/cookieUtil";
import {useQuery} from "react-query";
import {getUnreadAlarmCount} from "src/apis/Alarm";
import {getUnreadChatMessageCount} from "src/apis/Chat";
import useCustomRouter from "src/hooks/routerHook";
import {getProfileImage} from "src/apis/Member";

const NavbarMenu = () => {
    const userId = getCookie('userId')
    const [noticeOpen, setNoticeOpen] = useState(false);
    const noticeRef = useRef<HTMLDivElement>(null);
    const {onConflictRoute} = useCustomRouter();
    const unReadAlarmQuery = useQuery('unReadAlarm', ()=>getUnreadAlarmCount(),{
        staleTime : 60 * 10 * 1000
    });
    const unReadMessageQuery = useQuery('unReadMessage', () => getUnreadChatMessageCount());

    const onCloseNotice = () => {
        setNoticeOpen(false);
    }

    const handleClickProfile = () => {
        onConflictRoute(`/profile/${userId}`);
    }

    const handleClickNotice = () => {
        setNoticeOpen((noticeOpen)=> !noticeOpen);
    }

    const handleClickChat = () => {
        onConflictRoute(`/message`);
    }

    handleClickRefOutSide(noticeRef,onCloseNotice);

    const onClickLogin = () => {
        onConflictRoute(`/login`);
    }

    return (
        <div className={style.user_box}>
            {userId
                ?
                <div className={style.icon_box}>
                    <div className={style.menu_box} ref={noticeRef}>
                        <FavoriteBorderOutlinedIcon className={style.icon} onClick={handleClickNotice} fontSize={'inherit'}/>
                        {unReadAlarmQuery.data !== 0 && <span className={style.notice_count}>{unReadAlarmQuery.data}</span>}
                        {noticeOpen && <Alarm setModalOpen={setNoticeOpen}/>}
                    </div>
                    <div className={style.menu_box}>
                        <ChatBubbleOutlineRoundedIcon className={style.icon} onClick={handleClickChat} fontSize={'inherit'}/>
                        {unReadMessageQuery.data !== 0 && <span className={style.notice_count}>{unReadMessageQuery.data}</span>}
                    </div>
                    <div className={style.menu_box} onClick={handleClickProfile}>
                        <img className={style.img} src={getProfileImage(userId,'MID')} width={26} height={26}/>
                    </div>
                </div>
                :
                <span className={style.login_btn} onClick={onClickLogin}>로그인</span>
            }
        </div>
    );
};

export default NavbarMenu;

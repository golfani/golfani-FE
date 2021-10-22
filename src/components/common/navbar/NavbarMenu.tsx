import style from "./navbarMenu.module.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MyMenu from "../MyMenu";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Alarm from "src/components/common/alarm/Alarm";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {getCookie} from "src/utils/cookieUtil";
import {useQuery} from "react-query";
import {getUnreadAlarmCount} from "src/apis/Alarm";

const NavbarMenu = () => {
    const userId = getCookie('userId')
    const [myMenuOpen, setMyMenuOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const myOpenRef = useRef<HTMLDivElement>(null);
    const noticeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const unReadAlarmQuery = useQuery('unReadAlarm', ()=>getUnreadAlarmCount(),{
        staleTime : 60 * 10 * 1000
    });

    const onCloseMyMenu = () => {
        setMyMenuOpen((myMenuOpen)=> false);
    }

    const onCloseNotice = () => {
        setNoticeOpen(false);
    }

    const handleClickMyMenu = () => {
        setMyMenuOpen((myMenuOpen)=> !myMenuOpen);
    }

    const handleClickNotice = () => {
        setNoticeOpen((noticeOpen)=> !noticeOpen);
    }

    handleClickRefOutSide(myOpenRef,onCloseMyMenu);
    handleClickRefOutSide(noticeRef,onCloseNotice);

    const onClickLogin = () => {
        router.push("/login");
    }
    return (
        <div className={style.user_box}>
            {userId
                ?
                <div className={style.icon_box}>
                    <div className={style.menu_box} ref={myOpenRef}>
                        <AccountCircleOutlinedIcon className={style.icon} onClick={handleClickMyMenu} fontSize={'inherit'}/>
                        <span className={style.notice_count}>{1}</span>
                        {myMenuOpen && <MyMenu open={myMenuOpen}/>}
                    </div>
                    <div className={style.menu_box} ref={noticeRef}>
                        <FavoriteBorderOutlinedIcon className={style.icon} onClick={handleClickNotice} fontSize={'inherit'}/>
                        {unReadAlarmQuery.data !== 0 && <span className={style.notice_count}>{unReadAlarmQuery.data}</span>}
                        {noticeOpen && <Alarm/>}
                    </div>
                </div>
                :
                <span className={style.login_btn} onClick={onClickLogin}>로그인</span>
            }
        </div>
    );
};

export default NavbarMenu;

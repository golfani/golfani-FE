import style from "./navbarMenu.module.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MyMenu from "../MyMenu";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Notice from "../notice/Notice";
import useLogin from "src/store/modules/login/loginHook";
import useNotice from "src/store/modules/notice/noticeHook";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {handleClickRefOutSide} from "src/utils/clickUtil";

const NavbarMenu = () => {
    const login = useLogin();
    const notice = useNotice();
    const [myMenuOpen, setMyMenuOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const myOpenRef = useRef<HTMLDivElement>(null);
    const noticeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
        notice.onReadCommonNotice();
    }

    handleClickRefOutSide(myOpenRef,onCloseMyMenu);
    handleClickRefOutSide(noticeRef,onCloseNotice);

    const onClickLogin = () => {
        router.push("/login");
    }
    return (
        <div className={style.user_box}>
            {login.isLoggedIn
                ?
                <div className={style.icon_box}>
                    <div className={style.menu_box} ref={myOpenRef}>
                        <AccountCircleOutlinedIcon className={style.icon} onClick={handleClickMyMenu} fontSize={'inherit'}/>
                        <span className={style.notice_count}>{notice.countNewMessage()}</span>
                        <MyMenu open={myMenuOpen}/>
                    </div>
                    <div className={style.menu_box} ref={noticeRef}>
                        <FavoriteBorderOutlinedIcon className={style.icon} onClick={handleClickNotice} fontSize={'inherit'}/>
                        {notice.countNewNotice() !== 0 && <span className={style.notice_count}>{notice.countNewNotice()}</span>}
                        {noticeOpen && <Notice/>}
                    </div>
                </div>
                :
                <span className={style.login_btn} onClick={onClickLogin}>로그인</span>
            }
        </div>
    );
};

export default NavbarMenu;

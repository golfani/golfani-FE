import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import style from './feedNavbar.module.css'
import TagSearch from "./TagSearch";
import FeedStyleTab from "./FeedStyleTab";
import {useRouter} from "next/router";
import MyMenu from "../common/MyMenu";
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import useLogin from "src/store/modules/login/loginHook";
import Notice from "../common/notice/Notice";
import useNotice from "src/store/modules/notice/noticeHook";

const FeedNavBar = () : JSX.Element => {
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
      <div className={style.container}>
          <div className={style.navbar_box}>
              <span className={style.logo_txt}>DAILY SHOT</span>
              <div className={style.feed_box}>
                  <TagSearch/>
                  <FeedStyleTab/>
              </div>
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
          </div>
      </div>
    );
}

export default FeedNavBar;

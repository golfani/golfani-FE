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

const FeedNavBar = () : JSX.Element => {
    const login = useLogin();
    const [myMenuOpen, setMyMenuOpen] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onCloseMyMenu = () => {
        setMyMenuOpen((myMenuOpen)=> false);
    }

    const handleClickMyMenu = () => {
        setMyMenuOpen((myMenuOpen)=> !myMenuOpen);
    }

    handleClickRefOutSide(targetRef,onCloseMyMenu);

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
                          <div className={style.myMenu_box} ref={targetRef}>
                              <AccountCircleOutlinedIcon className={style.icon} onClick={handleClickMyMenu}/>
                              <MyMenu open={myMenuOpen}/>
                          </div>
                          <div>
                            <FavoriteBorderOutlinedIcon className={style.icon}/>
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

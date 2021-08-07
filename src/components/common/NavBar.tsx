import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import style from './navbar.module.css'
import TagSearch from "../feed/TagSearch";
import FeedStyleTab from "../feed/FeedStyleTab";
import {useRouter} from "next/router";

const NavBar = () : JSX.Element => {
    const router = useRouter();

    const onClickLogin = () => {
        router.push("/login");
    }

    return (
      <div className={style.container}>
          <div>
              <span className={style.logo_txt}>DAILY SHOT</span>
              <div className={style.feed_box}>
                  <TagSearch/>
                  <FeedStyleTab/>
              </div>
              <div className={style.user_box}>
                  <div className={style.icon_box}>
                      <AccountCircleOutlinedIcon className={style.icon}/>
                      <FavoriteBorderOutlinedIcon className={style.icon}/>
                  </div>
                  <div>
                      <button className={style.login_btn} onClick={onClickLogin}>로그인</button>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default NavBar;

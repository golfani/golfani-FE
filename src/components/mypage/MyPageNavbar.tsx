import style from "./myPageNavbar.module.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const MyPageNavbar = () : JSX.Element => {

    return (
        <div className={style.container}>
            <div>
                <span className={style.logo_txt}>DAILY SHOT</span>
                <div className={style.user_box}>
                    <div className={style.icon_box}>
                        <AccountCircleOutlinedIcon className={style.icon}/>
                        <FavoriteBorderOutlinedIcon className={style.icon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageNavbar;
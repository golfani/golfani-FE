import style from './myMenu.module.css';
import {useRouter} from "next/router";
import {getCookie, removeCookie} from "src/utils/cookieUtil";
import useCustomRouter from "src/hooks/routerHook";

interface IMyMenuProps {
    open : boolean
}

const MyMenu = (props : IMyMenuProps) : JSX.Element => {
    const userId = getCookie('userId');
    const router = useRouter();
    const {onConflictRoute} = useCustomRouter();

    const handleClickProfile = () => {
        onConflictRoute(`/profile/${userId}`)
    }

    const handleClickMessage = () => {
        onConflictRoute('/message')
    }

    const handleClickLogout = () => {
        if(typeof window !== 'undefined') {
            removeCookie('userId');
            removeCookie('refreshToken');
            // 페이지 새로고침하여 JS 리로딩
            router.reload();
        }
    }

    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <button className={style.menu_btn} onClick={handleClickProfile}>PROFILE</button>
            <div className={style.menu_btn} onClick={handleClickMessage}>
                <span >MESSAGE</span>
                <span className={style.message_count}>{1}</span>
            </div>
            <button className={style.menu_btn} onClick={handleClickLogout}>로그아웃</button>
        </div>
    );
};

export default MyMenu;

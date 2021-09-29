import style from './myMenu.module.css';
import {useRouter} from "next/router";
import useNotice from "src/store/modules/notice/noticeHook";

interface IMyMenuProps {
    open : boolean
}

const MyMenu = (props : IMyMenuProps) : JSX.Element => {
    const router = useRouter();
    const notice = useNotice();

    const handleClickProfile = () => {
        router.push('/mypage');
    }

    const handleClickMessage = () => {
        router.push('/message');
    }

    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <button className={style.menu_btn} onClick={handleClickProfile}>PROFILE</button>
            <div className={style.menu_btn} onClick={handleClickMessage}>
                <span >MESSAGE</span>
                <span className={style.message_count}>{notice.countNewMessage()}</span>
            </div>
            <button className={style.menu_btn}>로그아웃</button>
        </div>
    );
};

export default MyMenu;

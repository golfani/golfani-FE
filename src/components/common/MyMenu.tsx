import style from './myMenu.module.css';
import {useRouter} from "next/router";

interface IMyMenuProps {
    open : boolean
}

const MyMenu = (props : IMyMenuProps) : JSX.Element => {
    const router = useRouter();

    const handleClickProfile = () => {
        router.push('/mypage');
    }

    const handleClickMessage = () => {
        router.push('/message');
    }

    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <button className={style.menu_btn} onClick={handleClickProfile}>PROFILE</button>
            <button className={style.menu_btn} onClick={handleClickMessage}>MESSAGE</button>
            <button className={style.menu_btn}>로그아웃</button>
        </div>
    );
};

export default MyMenu;

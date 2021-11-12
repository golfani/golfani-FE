import style from './userMenuModal.module.css';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {removeCookie} from "src/utils/cookieUtil";
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import ScrapModal from "./scrap/ScrapModal";

interface IUserMenuModalProps {
    setModalOpen : (state : boolean) => void
}

const UserMenuModal = (props : IUserMenuModalProps) : JSX.Element => {
    const [isClose, setIsClose] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const [scrapModalOpen, setScrapModalOpen] = useState(false);

    const onCloseModal = () => {
        props.setModalOpen(false);
    }

    const onCloseModalForMobile = () => {
        setIsClose(true);
        setTimeout(()=> {
            onCloseModal();
        },500)
    }

    const handleClickBackIcon = () => {
        onCloseModalForMobile();
    }

    const handleClickLogOut = () => {
        if(typeof window !== 'undefined') {
            removeCookie('userId');
            removeCookie('refreshToken');
            window.location.reload();
        }
    }

    const handleClickScrap = () => {
        setScrapModalOpen(true);
    }

    handleClickRefOutSide(userMenuRef,onCloseModal);

    return (
        <div className={isClose ? style.modal_close : style.modal}>
            <div className={style.container} ref={userMenuRef}>
                <div className={style.title_box}>
                    <div className={style.title_icon}>
                        <ArrowBackIosNewIcon onClick={handleClickBackIcon}/>
                    </div>
                    <span className={style.title_txt}>설정</span>
                </div>
                <div className={style.menu_container}>
                    <div className={style.menu_box}>
                        <h3 className={style.menu_title_txt}>계정</h3>
                        <span className={style.menu_txt}>닉네임 변경</span>
                        <span className={style.menu_txt}>비밀번호 변경</span>
                    </div>
                    <div className={style.menu_box}>
                        <h3 className={style.menu_title_txt}>활동</h3>
                        <span className={style.menu_txt} onClick={handleClickScrap}>스크랩</span>
                    </div>
                    <div className={style.menu_box}>
                        <h3 className={style.menu_title_txt}>기타</h3>
                        <span className={style.menu_txt} onClick={handleClickLogOut}>로그아웃</span>
                    </div>
                </div>
                {scrapModalOpen && <ScrapModal setModalOpen={setScrapModalOpen}/>}
            </div>
        </div>
    );
};

export default UserMenuModal;

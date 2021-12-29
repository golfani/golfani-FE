import style from './shopRegNoticeModal.module.css';
import {useState} from "react";

const ShopRegNoticeModal = () : JSX.Element => {
    const [openType, setOpenType] = useState(false);

    const typeClickHandler = () => {
        setOpenType(!openType);
    }

    return(
        <div className={style.container}>
            <div className={style.box_wrap}>
                <span onClick={typeClickHandler}>타입 선택</span>
                {
                    openType &&
                    <ul className={style.notice_menu}>
                        <li>[evnet]</li>
                        <li>[공지]</li>
                        <li>[긴급]</li>
                    </ul>
                }
                <div>
                    asdf
                </div>
            </div>
        </div>
    )
}

export default ShopRegNoticeModal;
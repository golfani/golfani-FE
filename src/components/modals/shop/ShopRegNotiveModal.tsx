import style from './shopRegNoticeModal.module.css';
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "../../../utils/clickUtil";

interface ICloseNoticeModalProps{
    closeModal : () => void;
}

const ShopRegNoticeModal = ({closeModal} : ICloseNoticeModalProps) : JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [openType, setOpenType] = useState(true);

    const typeClickHandler = () => {
        setOpenType(!openType);
    }

    handleClickRefOutSide(ref, closeModal);

    return(
        <div className={style.container} >
            <div className={style.box_wrap} ref={ref}>
                <div className={style.notice_header} style={{padding:'0px'}}>
                    <span style={{color:'red'}}>취소</span>
                    <span style={{fontSize:'18px'}}>공지 모달</span>
                    <span>작성</span>
                </div>
                <div className={style.type_wrap}>
                    <span onClick={typeClickHandler}>타입</span>
                    {
                        openType &&
                        <ul className={style.notice_menu}>
                            <li>이벤트</li>
                            <li>공지</li>
                            <li>핃독</li>
                        </ul>
                    }
                </div>
                <div className={style.notice_box}>
                    <span>제목</span>
                    <input type-='text' placeholder='공지 제목을 입력하세요.' className={style.title_txt}></input>
                    {/*<input type="text" className={style.title_txt}>asd </input>*/}
                </div>
                <div className={style.notice_box}>
                    <span>내용</span>
                    <textarea placeholder='공지 내용을 입력하세요.' className={style.payload_txt}/>
                </div>

                <label htmlFor='img' className={style.file_label}>이미지</label>
                <input type="file" id='img' className={style.file_box}/>
            </div>
        </div>
    )
}

export default ShopRegNoticeModal;
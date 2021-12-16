import style from "./boardWriteImg.module.css";
import React, {useRef, useState} from "react";
import BoardImgModal from "../modals/board/BoardImgModal";
import {handleClickRefOutSide} from "../../utils/clickUtil";

export interface IBoardWriteImg{
    index : number,
    src : string,
    handleDeleteImg : (index:number) => void
}

const BoardWriteImage = (BoardWriteImg : IBoardWriteImg) => {
    const [openModal, setOpenModal] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleOnImgClick = () => {
        setOpenModal(!openModal);
    }

    const fadeModalOut = () => {
        setOpenModal(false);
    }

    handleClickRefOutSide(ref, fadeModalOut);

    return(
        <div className={style.container} ref={ref}>
            {openModal && <BoardImgModal IBoardWriteImg={BoardWriteImg}/>}
            <img src={BoardWriteImg.src} className={style.preview_img} onClick={handleOnImgClick}/>
        </div>
    )
}

export default BoardWriteImage;
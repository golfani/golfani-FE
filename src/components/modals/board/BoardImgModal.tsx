import style from './boardImgModal.module.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import {IBoardWriteImg} from "../../board/write/BoardWriteImage";
import {onHandleImgClick} from "../../../domain/board";

interface IBoardImgProps{
    IBoardWriteImg : IBoardWriteImg
}
const BoardImgModal = ({IBoardWriteImg} : IBoardImgProps) => {
    return(
        <div className={style.container}>
            <ZoomInIcon onClick={() => onHandleImgClick(IBoardWriteImg.src)} key={IBoardWriteImg.index} />
            <div className={style.line}></div>
            <DeleteForeverIcon className={style.delete_btn} onClick={() => IBoardWriteImg.handleDeleteImg(IBoardWriteImg.index)} />
        </div>
    )
}

export default BoardImgModal;
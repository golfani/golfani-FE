import style from './boardHome.module.css';
import BoardPreview from "./BoardPreview";
import {EBoardType} from "src/domain/board";

const BoardHome = () : JSX.Element => {
    return (
        <div className={style.container}>
            <BoardPreview category={EBoardType.HOT}/>
            <BoardPreview category={EBoardType.FREE}/>
            <BoardPreview category={EBoardType.TIP}/>
            <BoardPreview category={EBoardType.TRADE}/>
            <BoardPreview category={EBoardType.ANONYMOUS}/>
            <BoardPreview category={EBoardType.REVIEW}/>
            <BoardPreview category={EBoardType.ASK}/>
        </div>
    );
};

export default BoardHome;

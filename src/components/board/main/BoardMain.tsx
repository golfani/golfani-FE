import style from 'src/components/board/main/boardMain.module.css'
import BoardList from 'src/components/board/main/item/BoardList';
import BoardPage from 'src/components/board/main/page/BoardPage';
import {EType} from "../../../domain/board";

export interface ITypeProps{
    boardType : EType
}

const BoardMain = (boardType : ITypeProps): JSX.Element => {

    return(
        <div className={style.container}>
            <div>
                <BoardList boardType={boardType.boardType}/>
                <BoardPage boardType={boardType.boardType}/>
            </div>
        </div>
    )
}

export default BoardMain;
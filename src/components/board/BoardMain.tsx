import style from 'src/components/board/boardMain.module.css'
import BoardList from 'src/components/board/item/BoardList';
import BoardPage from 'src/components/board/page/BoardPage';
import {EBoardType} from "../../domain/board";
import BoardListHead from "./item/BoardListHead";

export interface ITypeProps{
    boardType : EBoardType | null
}

const BoardMain = ({boardType} : ITypeProps): JSX.Element => {
    return(
        <div>
            <div className={style.board_container}>
                <div>
                    <BoardListHead boardType={boardType}/>
                    <BoardList boardType={boardType}/>
                </div>
            </div>
            <BoardPage boardType={boardType}/>
        </div>
    )
}

export default BoardMain;
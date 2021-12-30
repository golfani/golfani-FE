import style from 'src/components/board/boardMain.module.css'
import BoardList from 'src/components/board/item/BoardList';
import BoardFloatWriteButton from 'src/components/board/page/BoardFloatWriteButton';
import {EBoardType} from "src/domain/board";
import BoardListHead from "./item/BoardListHead";
import React from "react";
import BoardHome from "./home/BoardHome";

export interface IBoardTypeProps{
    boardType? : EBoardType
}

const BoardMain = ({boardType} : IBoardTypeProps): JSX.Element => {
    return(
        <div className={style.container}>
            {boardType !== EBoardType.HOME ?
                <div>
                    <BoardListHead boardType={boardType}/>
                    <BoardList boardType={boardType}/>
                    <BoardFloatWriteButton boardType={boardType}/>
                </div>
                :
                <BoardHome/>
            }
        </div>
    )
}

export default BoardMain;

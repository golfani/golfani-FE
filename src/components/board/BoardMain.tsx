import style from 'src/components/board/boardMain.module.css'
import BoardList from 'src/components/board/item/BoardList';
import BoardPage from 'src/components/board/page/BoardPage';
import {EBoardType} from "src/domain/board";
import BoardListHead from "./item/BoardListHead";
import React from "react";

export interface ITypeProps{
    boardType : EBoardType | null
}

const BoardMain = ({boardType} : ITypeProps): JSX.Element => {
    return(
        <div className={style.container}>
            {boardType !== EBoardType.HOME ?
                <div>
                    <BoardListHead boardType={boardType}/>
                    <BoardList boardType={boardType}/>
                    <BoardPage boardType={boardType}/>
                </div>
                :
                null // Home Category 컴포넌트 구현
            }
        </div>
    )
}

export default BoardMain;

import style from 'src/components/board/boardMain.module.css'
import BoardList from 'src/components/board/item/BoardList';
import BoardPage from 'src/components/board/page/BoardPage';
import {EType} from "../../domain/board";
import BoardListHead from "./item/BoardListHead";
import {useEffect, useState} from "react";

export interface ITypeProps{
    boardType : EType | null
}

const BoardMain = ({boardType} : ITypeProps): JSX.Element => {


    return(
        <div className={style.container}>
            <div>
                <BoardListHead boardType={boardType}/>
                <BoardList boardType={boardType}/>
                <BoardPage boardType={boardType}/>
            </div>
        </div>
    )
}

export default BoardMain;
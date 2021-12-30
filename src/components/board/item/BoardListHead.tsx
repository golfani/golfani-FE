import style from 'src/components/board/item/boardListHead.module.css';
import {IBoardTypeProps} from "../BoardMain";
import {useEffect, useState} from "react";
import {boardTypeToPostString} from "src/utils/boardUtil";

const BoardListHead = ({boardType} : IBoardTypeProps) => {
    const [type, setType] = useState('')

    useEffect(()=>{
        boardType ? setType(boardTypeToPostString(boardType)) : setType('검색 결과');
    },[boardType])

    return (
        <div className={style.container}>
            <span className={style.head_text}>{type}</span>
        </div>
    )
}

export default BoardListHead;

import style from 'src/components/board/item/boardListHead.module.css';
import {ITypeProps} from "../BoardMain";
import {useEffect, useState} from "react";
import {EBoardType} from "src/domain/board";

const BoardListHead = ({boardType} : ITypeProps) => {
    const [type, setType] = useState('')

    useEffect(()=>{
        if(boardType === EBoardType.FREE)
        {
            setType('자유게시판')
        }
        else if(boardType === EBoardType.TIP) {
            setType('TIP 게시판')
        }
        else if(boardType === EBoardType.TRADE){
            setType('거래게시판')
        }
        else if(boardType === EBoardType.ANONYMOUS)
        {
            setType('익명게시판');
        }
        else{
            setType('검색결과')
        }
    },[boardType])

    return (
        <div className={style.container}>
            <span className={style.head_text}>{type}</span>
        </div>
    )
}

export default BoardListHead;

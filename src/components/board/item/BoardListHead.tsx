import style from 'src/components/board/item/boardListHead.module.css';
import {IBoardTypeProps} from "../BoardMain";
import {useEffect, useState} from "react";
import {boardTypeToPostString} from "src/utils/boardUtil";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {useRouter} from "next/router";

const BoardListHead = ({boardType} : IBoardTypeProps) => {
    const [type, setType] = useState('');
    const router = useRouter();

    useEffect(()=>{
        boardType ? setType(boardTypeToPostString(boardType)) : setType('검색 결과');
    },[boardType]);

    const handleClickBackIcon = () => {
        router.push('/board');
    }

    return (
        <div className={style.container}>
            <ArrowBackIosNewIcon className={style.back_icon} onClick={handleClickBackIcon}/>
            <span className={style.head_text}>{type}</span>
        </div>
    )
}

export default BoardListHead;

import Navbar from "../../src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/BoardMain';
import BoardLeftSideBar from 'src/components/board/BoardLeftSideBar';
import {useEffect, useState} from "react";
import {EBoardType} from "src/domain/board";
import {useRouter} from "next/router";
import style from 'src/components/board/board.module.css'


const Board = () : JSX.Element => {
    const router = useRouter();
    const {type} = router.query;

    const [boardType,setBoardType] = useState<EBoardType | null>(type as EBoardType);

    const onSetBoardType = (type: EBoardType) => {
        setBoardType(type as EBoardType);
    }

    useEffect(()=>{
        if(type === undefined) router.push(`/board?type=FREE&page=0`);
    },[])

    return (
        <div className={style.container}>
            <Navbar/>
            <BoardLeftSideBar onSetBoardType={onSetBoardType}/>
            <BoardMain boardType={boardType}/>
        </div>
    )
};

export default Board;

import Navbar from "../../src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/BoardMain';
import BoardLeftSideBar from 'src/components/board/leftSideBar/BoardLeftSideBar';
import {useEffect, useState} from "react";
import {EType} from "src/domain/board";
import {useRouter} from "next/router";


const Board = () : JSX.Element => {
    const router = useRouter();
    const {type,page} = router.query;

    const [boardType,setBoardType] = useState<EType | null>(type as EType);

    const onSetBoardType = (type: EType) => {
        setBoardType(type as EType);
    }

    useEffect(()=>{
        if(type === undefined) router.push(`/board?type=FREE&page=0`);
    },[]) // 교체 예정

    return (
        <div>
            <Navbar/>
            <BoardLeftSideBar onSetBoardType={onSetBoardType}/>
            <BoardMain boardType={boardType}/>
        </div>
    )
};

export default Board;

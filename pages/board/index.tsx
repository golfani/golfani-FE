import Navbar from "src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/BoardMain';
import BoardCategory from 'src/components/board/BoardCategory';
import React, {useEffect, useState} from "react";
import {EBoardType, TSelectMenu} from "src/domain/board";
import {useRouter} from "next/router";
import style from 'styles/board.module.css';
import BoardSearch from "src/components/board/search/BoardSearch";

const Board = () : JSX.Element => {
    const router = useRouter();
    const {type} = router.query;
    const {selectMenu, payload} = router.query;

    const [boardType,setBoardType] = useState<EBoardType>(type as EBoardType);

    const onSetBoardType = (type: EBoardType) => {
        setBoardType(type as EBoardType);
    }

    useEffect(()=> {
        type ? setBoardType(type as EBoardType) : setBoardType(EBoardType.HOME);
    },[type]);

    return (
        <div className={type || payload ? style.container_white : style.container}>
            <Navbar/>
            <div className={style.main_box}>
                <BoardCategory onSetBoardType={onSetBoardType} boardType={boardType}/>
                {selectMenu && payload
                    ? <BoardSearch selectMenu={selectMenu as TSelectMenu} payload={payload as string}/>
                    : <BoardMain boardType={boardType}/>
                }
            </div>
        </div>
    )
};

export default Board;

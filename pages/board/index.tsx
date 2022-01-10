import Navbar from "src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/BoardMain';
import BoardCategory from 'src/components/board/BoardCategory';
import React, {useEffect, useState} from "react";
import {EBoardType} from "src/domain/board";
import {useRouter} from "next/router";
import style from 'styles/board.module.css';
import {isMobile} from "src/utils/detectDevice";
import BoardBottomNav from "src/components/board/BoardBottomNav";
import BoardMobileCategory from "src/components/board/mobile/BoardMobileCategory";
import BoardMobileSearch from "src/components/board/mobile/BoardMobileSearch";

const Board = (): JSX.Element => {
    const router = useRouter();
    const {type} = router.query;
    const {payload} = router.query;

    const [boardType, setBoardType] = useState<EBoardType>(type as EBoardType);

    const onSetBoardType = (type: EBoardType) => {
        setBoardType(type as EBoardType);
    }

    useEffect(() => {
        type ? setBoardType(type as EBoardType) : setBoardType(EBoardType.HOME);
    }, [type]);

    const renderBoardContent = () => {
        if (boardType === EBoardType.CATEGORY)
            return <BoardMobileCategory/>
        else if (boardType === EBoardType.SEARCH)
            return <BoardMobileSearch/>
        else
            return <BoardMain boardType={boardType}/>
    }

    return (
        <div className={type || payload ? style.container_white : style.container}>
            <Navbar/>
            <div className={style.main_box}>
                {isMobile() ? <BoardBottomNav/> :
                    <BoardCategory onSetBoardType={onSetBoardType} boardType={boardType}/>}
                {renderBoardContent()}
            </div>
        </div>
    )
};

export default Board;

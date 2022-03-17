import Navbar from "src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/BoardMain';
import BoardCategory from 'src/components/board/BoardCategory';
import React, {useEffect, useState} from "react";
import {EBoardType} from "src/domain/board";
import {useRouter} from "next/router";
import style from 'styles/board.module.css';
import BoardBottomNav from "src/components/board/BoardBottomNav";
import BoardMobileCategory from "src/components/board/mobile/BoardMobileCategory";
import BoardMobileSearch from "src/components/board/mobile/BoardMobileSearch";
import Head from "next/head";
import useDevice from "src/hooks/deviceHook";

const Board = (): JSX.Element => {
    const router = useRouter();
    const {type} = router.query;
    const {payload} = router.query;
    const {isMobile} = useDevice();

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
            <Head>
                <title>골아니 커뮤니티</title>
                <meta name="description" content="골프정보를 공유하는 커뮤니티 페이지 입니다."/>
                <meta property="og:title" key="ogtitle" content="골아니 커뮤니티"/>
                <meta property="og:description" key="ogdesc" content="골프정보를 공유하는 커뮤니티 페이지 입니다."/>
                <meta property="og:url" key="ogurl" content="https://golfani.com/board"/>
            </Head>
            <Navbar/>
            <div className={style.main_box}>
                {isMobile ? <BoardBottomNav/> :
                    <BoardCategory onSetBoardType={onSetBoardType} boardType={boardType}/>}
                {renderBoardContent()}
            </div>
        </div>
    )
};

export default Board;

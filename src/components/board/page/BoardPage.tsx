import style from 'src/components/board/page/boardPage.module.css';
import React from "react";
import Link from 'next/link'
import {ITypeProps} from "../BoardMain";
import BoardSearchBar from "./BoardSearchBar";


export type TSelectMenu = 'USER' | 'CONTENT' | 'TITLE'

const BoardPage = (boardType : ITypeProps) : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.button_wrap}>
                <Link href={{
                    pathname: '/board/write',
                    query : {boardType : boardType.boardType}
                }} as ={'board/write'}>
                    <button className={style.write_button}>
                        <p>글쓰기</p>
                    </button>
                </Link>
            </div>
            <BoardSearchBar/>
        </div>
    )
}

export default BoardPage;
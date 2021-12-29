import style from 'src/components/board/page/boardPage.module.css';
import React from "react";
import Link from 'next/link'
import {ITypeProps} from "../BoardMain";
import {getCookie} from "src/utils/cookieUtil";

export type TSelectMenu = 'USER' | 'CONTENT' | 'TITLE'

const BoardPage = (boardType : ITypeProps) : JSX.Element => {
    const userId = getCookie("userId");
    return (
        <div className={style.container}>
            <div className={style.button_wrap}>
                {
                    userId &&
                    <Link href={{
                        pathname: '/board/write',
                        query: {boardType: boardType.boardType}
                        }}>
                        <button className={style.write_button}>
                            <p>글쓰기</p>
                        </button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default BoardPage;

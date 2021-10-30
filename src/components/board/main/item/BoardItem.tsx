import style from 'src/components/board/main/item/boardItem.module.css';
import React from 'react';
import {IBoardData} from "../../../../apis/Board";
import {useRouter} from "next/router";

interface IBoardProps{
    boardList : IBoardData[];
}

const BoardItem = ({boardList}: IBoardProps) : JSX.Element => {

    const router = useRouter();

    const onTitleClick = (id : number) => { // 클릭 되는 객체 반환
        router.push(`board/view/${id}`);
    }

    return(
        <>
        {boardList.map((board : IBoardData)=> {
                return(
                    <div className={style.board_item_container}>
                        <div className={style.num}>{board.id}</div>
                        <div className={style.board_title} onClick={() => onTitleClick(board.id)} >
                            <span
                                className={style.board_title_text} >{board.title.length > 30 ? board.title.slice(0, 27) + '...' : board.title}</span>
                        </div>
                        <div className={style.board_id}> {board.userId}</div>
                        <div className={style.board_date}>{board.createdTime.slice(0,10)}</div>

                        <div className={style.recommend}>
                            <span>❣️</span>
                            <span>{board.likesCount}</span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
export default BoardItem;

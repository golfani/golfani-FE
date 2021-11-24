import style from 'src/components/board/main/item/boardItem.module.css';
import React, {useEffect} from 'react';
import BoardItem from 'src/components/board/main/item/BoardItem';
import {getBoard, IBoardData} from "../../../../apis/Board";
import {ITypeProps} from "../BoardMain";
import {useQuery} from "react-query";
import {IPages} from "../../../../domain/Page";
import {useRouter} from "next/router";
import {EType} from "../../../../domain/board";
import BoardPageNum from "src/components/board/main/page/BoardPageNum";

const BoardList = (boardType : ITypeProps) : JSX.Element => {
    const router = useRouter();
    const {page} = router.query;

    const boardQuery = useQuery<IPages<IBoardData>>(['board', [boardType.boardType,Number(page)]], () => getBoard(boardType.boardType as EType, Number(page), 10), {
        enabled: boardType.boardType !== undefined
    });

    useEffect(() =>{
    },[boardType.boardType])

    return(
        <div>
            <div className={style.container}>
                <div className={style.list_item}>
                    <div className={style.list_top}>
                        <div className={style.num}>No.</div>
                        <div className={style.board_title}>글제목</div>
                        <div className={style.board_id}>글쓴이</div>
                        <div className={style.board_date}>작성일</div>
                        <div className={style.recommend}>추천</div>
                    </div>
                    {boardQuery.data &&
                    boardQuery.data.content.map((board : IBoardData)=> {
                        return(
                            <BoardItem key={board.id} board={board}/>
                        )
                    })}

                </div>
            </div>
            <div>
                <BoardPageNum totalPage={boardQuery.data?.totalPages as number}/>
            </div>
        </div>
    )
}

export default BoardList;
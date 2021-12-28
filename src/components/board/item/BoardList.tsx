import style from 'src/components/board/item/boardItem.module.css';
import React, {useEffect} from 'react';
import BoardItem from 'src/components/board/item/BoardItem';
import {getBoard, IBoardData} from "src/apis/Board";
import {ITypeProps} from "../BoardMain";
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";
import BoardPageNum from "src/components/board/page/BoardPageNum";

const BoardList = (boardType : ITypeProps) : JSX.Element => {
    const router = useRouter();
    const {page} = router.query;

    const boardQuery = useQuery<IPages<IBoardData>>(['board', [boardType.boardType,Number(page)]], () => getBoard(boardType.boardType as EBoardType, Number(page), 10), {
        enabled: boardType.boardType !== undefined
    });

    return(
        <div>
            <div className={style.container}>
                <div className={style.list_item}>
                    <div className={style.list_top}>
                        <div className={style.num}>No.</div>
                        <div className={style.board_title}>글제목</div>
                        <div className={style.board_id}>글쓴이</div>
                        <div className={style.board_date_head}>작성일</div>
                        <div className={style.recommend}>추천</div>
                        <div className={style.board_views}>조회수</div>
                    </div>
                    {boardQuery.data &&
                    boardQuery.data.content.map((board : IBoardData,index : number)=> {
                        return(
                            <BoardItem board={board} key={index}/>
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

import style from 'src/components/board/main/item/boardItem.module.css';
import {useEffect, useState} from 'react';
import BoardItem from 'src/components/board/main/item/BoardItem';
import {getBoard, getBoard2, IBoardData} from "../../../../apis/Board";
import {ITypeProps} from "../BoardMain";
import {useInfiniteQuery, useQuery} from "react-query";
import {IPages} from "../../../../domain/Page";

const BoardList = (boardType : ITypeProps) : JSX.Element => {

    const boardQuery = useQuery<IPages<IBoardData>>(['board',boardType.boardType], ({pageParam = '0'}) => getBoard(boardType.boardType), {
        enabled : boardType.boardType!==undefined,
    });

    useEffect(()=>{
    },[boardType])

    return(
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
                boardQuery.data.map((board : IBoardData)=> {
                    return(
                        <BoardItem board={board}/>
                    )
                })}
            </div>
        </div>
    )
}

export default BoardList;

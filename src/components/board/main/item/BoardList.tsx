import style from 'src/components/board/main/item/boardItem.module.css';
import {useEffect, useState} from 'react';
import BoardItem from 'src/components/board/main/item/BoardItem';
import {getBoard, IBoardData} from "../../../../apis/Board";
import {IProps} from "../BoardMain";
import {useInfiniteQuery, useQuery} from "react-query";

const BoardList = (props : IProps) : JSX.Element => {

    const boardQuery = useQuery(['board',props.props], () => getBoard(props.props), {
        enabled : props.props!==undefined,
    });

    useEffect(()=>{
        console.log(boardQuery.data);
    },[props.props])

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
                {boardQuery.data && <BoardItem boardList={boardQuery.data}></BoardItem>}
            </div>
        </div>
    )
}

export default BoardList;

import {ISearchProps} from "../../../../../pages/board/searchResult";
import style from 'src/components/board/main/page/boardSearch.module.css'
import {useQuery} from "react-query";
import {IPages} from "../../../../domain/Page";
import {IBoardData, searchBoard} from "../../../../apis/Board";
import {TSelectMenu} from "./BoardPage";
import BoardItem from "../item/BoardItem";
import React from "react";
import BoardPageNum from "./BoardPageNum";
import {useRouter} from "next/router";

const BoardSearch = ({selectMenu,payload} : ISearchProps) : JSX.Element => {

    const router = useRouter();
    const {page} = router.query;
    const boardQuery = useQuery<IPages<IBoardData>>(['searchResult', selectMenu], () => searchBoard(selectMenu as TSelectMenu,payload as string,Number(page)),{
        enabled : selectMenu !== undefined
    })

    return(

        <div className={style.container}>
            <div className={style.list_top}>
                <div className={style.num}>No.</div>
                <div className={style.board_title}>글제목</div>
                <div className={style.board_id}>글쓴이</div>
                <div className={style.board_date}>작성일</div>
                <div className={style.recommend}>추천</div>
            </div>
            {
                boardQuery.data &&
                boardQuery.data?.content.map((data) =>{
                    return(
                        <BoardItem key = {data.id} board={data}/>
                    )
                })
            }
            <BoardPageNum totalPage={boardQuery.data?.totalPages as number}/>
        </div>
    )
}

export default BoardSearch;



import {ISearchProps} from "../../../../pages/board/searchResult";
import style from 'src/components/board/page/boardSearch.module.css'
import {useQuery, useQueryClient} from "react-query";
import {IPages} from "src/domain/Page";
import {IBoardData, searchBoard} from "src/apis/Board";
import {TSelectMenu} from "./BoardPage";
import BoardItem from "src/components/board/item/BoardItem";
import React, {useEffect} from "react";
import BoardPageNum from "./BoardPageNum";
import {useRouter} from "next/router";

const BoardSearch = ({selectMenu,payload} : ISearchProps) : JSX.Element => {
    const router = useRouter();
    const {page} = router.query;

    const boardQuery = useQuery<IPages<IBoardData>>(['searchResult', [payload,Number(page)]], () => searchBoard(selectMenu as TSelectMenu,payload as string, Number(page)),{
        enabled : selectMenu !== undefined
    })

    return(
        <>
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
        </div>
            <BoardPageNum totalPage={boardQuery.data?.totalPages as number}/>
        </>
    )
}

export default BoardSearch;



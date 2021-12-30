import style from 'src/components/board/page/boardSearch.module.css'
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {IBoardData, searchBoard} from "src/apis/Board";
import BoardItem from "src/components/board/item/BoardItem";
import React from "react";
import BoardPageNum from "./BoardPageNum";
import {useRouter} from "next/router";
import BoardListHead from "../item/BoardListHead";
import BoardSearchType from "./BoardSearchType";
import BoardSearchBar from "./BoardSearchBar";
import {TSelectMenu} from "src/domain/board";

interface IBoardSearchProps {
    selectMenu : TSelectMenu
    payload : string
}

const BoardSearch = ({selectMenu,payload} : IBoardSearchProps) : JSX.Element => {
    const router = useRouter();
    const {page} = router.query;
    console.log(selectMenu,payload);

    const boardQuery = useQuery<IPages<IBoardData>>(['searchResult', [payload,Number(page)]], () => searchBoard(selectMenu as TSelectMenu, payload as string, Number(page)),{
        enabled : selectMenu !== undefined
    });

    return(
        <div className={style.container}>
            <BoardListHead boardType={null}/>
            <BoardSearchType/>
            <div className={style.search_box}>
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
            <BoardSearchBar/>
        </div>
    )
}

export default BoardSearch;

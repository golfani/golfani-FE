import style from 'src/components/board/search/boardSearch.module.css'
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {IBoardData, searchBoard} from "src/apis/Board";
import BoardItem from "src/components/board/item/BoardItem";
import React from "react";
import BoardPageNav from "../page/BoardPageNav";
import {useRouter} from "next/router";
import BoardListHead from "../item/BoardListHead";
import {EBoardType, TSelectMenu} from "src/domain/board";

interface IBoardSearchProps {
    selectMenu : TSelectMenu
    payload : string
}

const BoardSearch = ({selectMenu,payload} : IBoardSearchProps) : JSX.Element => {
    const router = useRouter();
    const {page,boardType} = router.query;

    const boardQuery = useQuery<IPages<IBoardData>>(['searchResult', [boardType,payload,Number(page)]], () => searchBoard(selectMenu as TSelectMenu, payload as string,boardType as EBoardType, Number(page)),{
        enabled : selectMenu !== undefined
    });

    console.log(boardQuery.data);

    return(
        <div className={style.container}>
            <BoardListHead/>
            <div className={style.post_box}>
                <div className={style.title_box}>
                    <span className={style.no_txt}>번호</span>
                    <span className={style.subject_txt}>제목</span>
                    <span className={style.writer_txt}>글쓴이</span>
                    <span className={style.date_txt}>작성일</span>
                    <span className={style.like_txt}>추천</span>
                    <span className={style.visit_txt}>조회</span>
                </div>
                <div>
                    {boardQuery.data?.totalPages ?
                        boardQuery.data?.content.map((board: IBoardData, index) => (
                            <BoardItem board={board} key={index}/>
                        ))
                        :
                        <span className={style.no_content_txt}>등록된 글이 없습니다.</span>
                    }
                </div>
            </div>
            {boardQuery.data?.totalPages ? <BoardPageNav totalPage={boardQuery.data?.totalPages!}/> : null}
        </div>
    )
}

export default BoardSearch;

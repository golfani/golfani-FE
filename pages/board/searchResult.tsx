import Navbar from "src/components/common/navbar/Navbar";
import {useRouter} from "next/router";
import React from "react";
import {TSelectMenu} from "src/components/board/page/BoardPage";
import BoardSearchType from "src/components/board/page/BoardSearchType";
import BoardSearch from "src/components/board/page/BoardSearch";
import BoardSearchBar from "src/components/board/page/BoardSearchBar";
import style from "src/components/board/boardMain.module.css"
import BoardListHead from "../../src/components/board/item/BoardListHead";

export interface ISearchProps{
    selectMenu : TSelectMenu,
    payload : string
}

const SearchResult = () : JSX.Element => {
    const router = useRouter();
    const {selectMenu, payload} = router.query;

    return(
        <div className={style.container}>
            <div className={style.board_container}>
                <Navbar/>
                <BoardListHead boardType={null}/>
                <BoardSearchType/>
                <BoardSearch selectMenu={selectMenu as TSelectMenu} payload={payload as string}/>
                <BoardSearchBar/>
            </div>
        </div>

    )
}

export default SearchResult;
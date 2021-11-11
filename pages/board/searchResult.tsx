import Navbar from "src/components/common/navbar/Navbar";
import {useRouter} from "next/router";
import {IBoardData, searchBoard} from "../../src/apis/Board";
import React from "react";
import {TSelectMenu} from "../../src/components/board/main/page/BoardPage";
import BoardSearchType from "../../src/components/board/main/page/BoardSearchType";
import BoardSearch from "../../src/components/board/main/page/BoardSearch";
import BoardSearchBar from "../../src/components/board/main/page/BoardSearchBar";
import BoardPageNum from "../../src/components/board/main/page/BoardPageNum";

export interface ISearchProps{
    selectMenu : TSelectMenu,
    payload : string
}

const SearchResult = () : JSX.Element => {
    const router = useRouter();
    const {selectMenu, payload} = router.query;

    return(
        <div>
            <Navbar/>
            <BoardSearchType/>
            <BoardSearch selectMenu={selectMenu as TSelectMenu} payload={payload as string}/>
            <BoardSearchBar/>

        </div>
    )
}

export default SearchResult;
import Navbar from "src/components/common/navbar/Navbar";
import {useRouter} from "next/router";
import React from "react";
import {TSelectMenu} from "src/components/board/page/BoardPage";
import BoardSearchType from "src/components/board/page/BoardSearchType";
import BoardSearch from "src/components/board/page/BoardSearch";
import BoardSearchBar from "src/components/board/page/BoardSearchBar";

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
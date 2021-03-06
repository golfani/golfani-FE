import style from './boardMobileSearch.module.css';
import BoardSearchBar from "../search/BoardSearchBar";
import BoardSearch from "../search/BoardSearch";
import {useRouter} from "next/router";
import {TSelectMenu} from "src/domain/board";
import React from "react";
import useDevice from "src/hooks/deviceHook";

const BoardMobileSearch = (): JSX.Element => {
    const router = useRouter();
    const {selectMenu, payload} = router.query;
    const {isMobile} = useDevice();

    return (
        <div className={style.container}>
            {isMobile && <BoardSearchBar/>}
            <BoardSearch selectMenu={selectMenu as TSelectMenu} payload={payload as string}/>
        </div>
    );
};

export default BoardMobileSearch;

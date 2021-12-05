import style from "./boardPage.module.css";
import React, {useEffect, useRef, useState} from "react";
import {TSelectMenu} from "./BoardPage";
import {useRouter} from "next/router";
import BoardSearchHistory from "./BoardSearchHistory";
import {handleClickRefOutSide} from "../../../utils/clickUtil";

export interface ISearchResult {
    date : number,
    payload : string
}

const BoardSearchBar = () : JSX.Element => {
    const router = useRouter();
    const [searchList, setSearchList] = useState<Array<ISearchResult>>([]);
    const [onSearchId, setOnSearchId] = useState(false);
    const searchId = useRef<HTMLDivElement>(null);
    const searchMenu = useRef<HTMLDivElement>(null);
    const [showMenu,setShowMenu] = useState(false);
    const [selectMenu, setSelectMenu] = useState<TSelectMenu>('TITLE');
    const [payload, setPayload] = useState('');

    const handlerSelectMenu = (menu: TSelectMenu) => {
        selectMenuClick(menu);
        selectBarClick();
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('searchList') as string || '[]') ;
        setSearchList(data);
    },[])

    useEffect(()=>{
        localStorage.setItem('searchList', JSON.stringify(searchList));
    },[searchList])

    const handleOnAddList = () => {
        const newData = {
            date : Date.now(),
            payload : payload
        }
        const data = searchList.find((el:ISearchResult) => el.payload === payload);
        if(!data) {
            console.log(searchList);
            setSearchList([newData, ...searchList]);
        }
    }

    const onClear = () => {
        setSearchList([]);
    }

    const handlerContentClick = () => {
        selectBarClick();
    }

    const onTextChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPayload(e.target.value);
    }

    const onSearchIdClick = () => {
        setOnSearchId(true);
    }

    const focusIdOut = () => {
        setOnSearchId(false);
    }

    const selectBarClick = () => {
        setShowMenu(!showMenu);
    }

    const onSearchBtnClick = () => {
        handleOnAddList();
        router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=0`);
    }

    const onKeyPress = (e :  React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key);
        if(e.key === "Enter" && !e.shiftKey)
        {
            console.log('123');
            onSearchBtnClick();
        }
    }

    handleClickRefOutSide(searchId, focusIdOut);

    return (
        <div className={style.search_bar}>
            <div className={style.select_wrap}>
                <button onClick={handlerContentClick} className={style.select_component}>
                    <span className={style.select_text}>{selectMenu}</span>
                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png" className={showMenu ? style.arrow_icon_open : style.arrow_icon} />
                </button>
                <div className={showMenu ? style.select_menu_wrap : style.select_hidden} ref={searchMenu}>
                    <ul>
                        <li className={style.select_menu}>
                            <button className={style.select_button} onClick={() => handlerSelectMenu("CONTENT")}>내용</button>
                        </li>
                        <li className={style.select_menu}>
                            <button className={style.select_button} onClick={() => handlerSelectMenu("USER")}>글쓴이</button>
                        </li>
                        <li className={style.select_menu}>
                            <button className={style.select_button} onClick={() => handlerSelectMenu("TITLE")}>제목</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div ref={searchId}>
                <input type="text" className={style.search_id} title={style.search_id} placeholder="검색어 입력" value = {payload} onClick={onSearchIdClick} onKeyPress={onKeyPress} onChange={onTextChange}></input>
                {onSearchId && <div className={style.delete_searchList} onClick={onClear}>전체삭제</div>}
                {onSearchId && <BoardSearchHistory searchResult={searchList} setSearchList={setSearchList} setPayload={setPayload}/>}
            </div>
            <button type="submit" className={style.search_btn} onClick={onSearchBtnClick} >검색</button>
        </div>
    )
}
export default BoardSearchBar;
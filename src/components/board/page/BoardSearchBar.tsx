import style from "./boardSearchBar.module.css";
import React, {useEffect, useRef, useState} from "react";
import {TSelectMenu} from "./BoardPage";
import BoardSearchHistory from "./BoardSearchHistory";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import SearchIcon from '@material-ui/icons/Search';
import useCustomRouter from "src/hooks/routerHook";

export interface ISearchResult {
    date : number
    payload : string
}

const BoardSearchBar = () : JSX.Element => {
    const [searchList, setSearchList] = useState<Array<ISearchResult>>([]);
    const [onSearchId, setOnSearchId] = useState(false);
    const searchId = useRef<HTMLDivElement>(null);
    const [selectMenu, setSelectMenu] = useState<TSelectMenu>('TITLE');
    const [payload, setPayload] = useState('');
    const router = useCustomRouter();

    const onInitSearch = () => {
        setSelectMenu('TITLE');
        setPayload('');
        setOnSearchId(false);
    }

    const handleChangeSelectMenu = (menu : string) => {
        selectMenuClick(menu as TSelectMenu);
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('searchList') as string || '[]');
        //기존 localStorage 가 저장되어있는 경우 새로운 배열로 초기화 해준다.
        if(JSON.stringify(data) === 'null') {
            localStorage.removeItem('searchList');
            localStorage.setItem('searchList', '[]');
        }
        else{
            setSearchList(data);
        }
    },[]);

    const onAddHistoryList = () => {
        const newData = {
            date : Date.now(),
            payload : payload
        }
        const data = searchList.find((el:ISearchResult) => el.payload === payload);
        if(!data) {
            setSearchList([newData, ...searchList]);
            updateSearchList();
        }
    }

    const updateSearchList = () => {
        localStorage.setItem('searchList', JSON.stringify(searchList));
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

    const handleClickSearchButton = () => {
        onAddHistoryList();
        router.onConflictRoute(`/board?selectMenu=${selectMenu}&payload=${payload}&page=0`);
        onInitSearch();
    }

    const onKeyPress = (e :  React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && !e.shiftKey)
        {
            handleClickSearchButton();
        }
    }

    handleClickRefOutSide(searchId, focusIdOut);

    return (
        <div className={style.container}>
            <select className={style.select_box} onChange={(e)=> handleChangeSelectMenu(e.target.value)}>
                <option value='TITLE'>제목</option>
                <option value='USER'>글쓴이</option>
                <option value='CONTENT'>내용</option>
            </select>
            <div className={style.search_box} ref={searchId}>
                <input
                    className={style.search_input}
                    title={style.search_id}
                    value = {payload}
                    onClick={onSearchIdClick}
                    onKeyPress={onKeyPress}
                    onChange={onTextChange}
                />
                {onSearchId && <BoardSearchHistory searchResult={searchList} setSearchList={setSearchList} setPayload={setPayload} setOnSearchId={setOnSearchId}/>}
                <SearchIcon className={style.search_icon} onClick={handleClickSearchButton}/>
            </div>
        </div>
    )
}
export default BoardSearchBar;

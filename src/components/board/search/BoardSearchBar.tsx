import style from "./boardSearchBar.module.css";
import React, {useEffect, useRef, useState} from "react";
import BoardSearchHistory from "./BoardSearchHistory";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import SearchIcon from '@material-ui/icons/Search';
import useCustomRouter from "src/hooks/routerHook";
import {EBoardType, TSelectMenu} from "src/domain/board";

const BoardSearchBar = () : JSX.Element => {
    const [searchList, setSearchList] = useState<Array<string>>([]);
    const [onSearchId, setOnSearchId] = useState(false);
    const searchId = useRef<HTMLDivElement>(null);
    const [selectMenu, setSelectMenu] = useState<TSelectMenu>('TITLE');
    const [boardType, setBoardType] = useState<EBoardType>(EBoardType.ALL);
    const [payload, setPayload] = useState('');
    const {onConflictRoute} = useCustomRouter();

    const onInitSearch = () => {
        setSelectMenu('TITLE');
        setPayload('');
        setOnSearchId(false);
    }

    const handleChangeBoardType = (type : string) => {
        setBoardType(type as EBoardType);
    }

    const handleChangeSelectMenu = (menu : string) => {
        selectMenuClick(menu as TSelectMenu);
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem('searchList') as string || '[]');
        //기존 localStorage 가 저장되어있는 경우 새로운 배열로 초기화 해준다.
        if(JSON.stringify(data) === 'null') {
            window.localStorage.removeItem('searchList');
            window.localStorage.setItem('searchList', '[]');
        }
        else{
            setSearchList(data);
        }
    },[]);

    const onAddHistoryList = () => {
        const data = searchList.find((el) => el === payload);
        if(!data) {
            searchList.splice(0,0,payload);
            window.localStorage.setItem('searchList', JSON.stringify(searchList));
        }
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
        if(payload.replace(/\s/g,'').length) {
            onConflictRoute(`/board?selectMenu=${selectMenu}&payload=${payload}&boardType=${boardType}&page=0`);
            onAddHistoryList();
            onInitSearch();
        }
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
            <select className={style.select_box} onChange={(e)=> handleChangeBoardType(e.target.value)}>
                <option value={EBoardType.ALL}>전체</option>
                <option value={EBoardType.FREE}>자유</option>
                <option value={EBoardType.ANONYMOUS}>익명</option>
                <option value={EBoardType.TIP}>정보</option>
                <option value={EBoardType.REVIEW}>후기</option>
                <option value={EBoardType.TRADE}>거래</option>
                <option value={EBoardType.ASK}>문의</option>
            </select>
            <select className={style.select_box} onChange={(e)=> handleChangeSelectMenu(e.target.value)}>
                <option value='TITLE'>제목</option>
                {boardType === EBoardType.ANONYMOUS || <option value='USER'>글쓴이</option>}
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

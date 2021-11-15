import style from "./boardPage.module.css";
import React, {useState} from "react";
import {TSelectMenu} from "./BoardPage";
import {searchBoard} from "src/apis/Board";
import {useRouter} from "next/router";

const BoardSearchBar = () : JSX.Element => {
    const router = useRouter();
    const handlerSelectMenu = (menu: TSelectMenu) => {
        selectMenuClick(menu);
        selectBarClick();
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }
    const [showMenu,setShowMenu] = useState(false);
    const [selectMenu, setSelectMenu] = useState<TSelectMenu>('TITLE');
    const [payload, setPayload] = useState('');

    const handlerContentClick = () => {
        selectBarClick();
    }

    const onTextChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setPayload(e.target.value);
    }

    const selectBarClick = () => {
        setShowMenu(!showMenu);
    }

    const onSearchBtnClick = async () => {
        const response = await searchBoard(selectMenu,payload);

        router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=0`);
    }

    return (
        <div className={style.search_bar}>
            <div className={style.select_wrap}>
                <button onClick={handlerContentClick} className={style.select_component}>
                    <span className={style.select_text}>{selectMenu}</span>
                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png" className={showMenu ? style.arrow_icon_open : style.arrow_icon}/>
                </button>
                <div className={showMenu ? style.select_menu_wrap : style.select_hidden}>
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
            <input type="text" className={style.search_id} title={style.search_id} placeholder="검색어 입력" value = {payload} onChange={onTextChange}></input>
            <button type="submit" className={style.search_btn} onClick={onSearchBtnClick}>검색</button>
        </div>
    )
}
export default BoardSearchBar;



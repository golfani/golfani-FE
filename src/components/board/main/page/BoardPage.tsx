import style from 'src/components/board/main/page/boardPage.module.css';
import React, {useState} from "react";
import Link from 'next/link'
import {ITypeProps} from "../BoardMain";

interface Props {
    postPerPage : number,
    totalLength : number,
    setCurrentPage : any
}

const BoardPage = (boardType : ITypeProps) : JSX.Element => {

    /* 추후 리스트 동적 생성 됨에따라 교체 예정 */
    type TSelectMenu = '글쓴이' | '제목' | '내용' | '게시글'

    const [showMenu,setShowMenu] = useState(false);
    const [onNum, setOnNum] = useState(1);

    const [selectMenu, setSelectMenu] = useState<TSelectMenu>("게시글");

    const handlerContentClick = () => {
        selectBarClick();
    }

    const selectBarClick = () => {
        setShowMenu(!showMenu);
    }

    const handlerPageClick = (index : number) => {
        pageClick(index);
    }

    const handlerSelectMenu = (menu: TSelectMenu) => {
        selectMenuClick(menu);
        selectBarClick();
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }

    const pageClick = (index : number) => {
        setOnNum(index);
    }

    return (
        <div className={style.container}>
            <div className={style.button_wrap}>
                <Link href={{
                    pathname: '/board/write',
                    query : {boardType : boardType.boardType}
                }} as ={'board/write'}>
                    <button className={style.write_button}>
                        <p>글쓰기</p>
                    </button>
                </Link>

            </div>

            <div className={style.board_page}>
                <a href="#1" className={style.btn}>처음</a>
                <a href="#2" className={style.btn}>이전</a>
                <a href="#1" onClick={() =>handlerPageClick(1)} className={onNum === 1 ? style.num_on : style.num}>1</a>
                <a href="#1" onClick={() =>handlerPageClick(2)} className={onNum === 2 ? style.num_on : style.num}>2</a>
                <a href="#1" onClick={() =>handlerPageClick(3)} className={onNum === 3 ? style.num_on : style.num}>3</a>
                <a href="#1" onClick={() =>handlerPageClick(4)} className={onNum === 4 ? style.num_on : style.num}>4</a>
                <a href="#1" onClick={() =>handlerPageClick(5)} className={onNum === 5 ? style.num_on : style.num}>5</a>
                <a href="#" className={style.btn}>다음</a>
                <a href="#" className={style.btn}>맨끝</a>
            </div>

            <div className={style.search_bar}>
                <div className={style.select_wrap}>
                    <button onClick={handlerContentClick} className={style.select_component}>
                        <span className={style.select_text}>{selectMenu}</span>
                        <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-arrow-arrows-those-icons-lineal-color-those-icons-1.png" className={showMenu ? style.arrow_icon_open : style.arrow_icon}/>
                    </button>
                    <div className={showMenu ? style.select_menu_wrap : style.select_hidden}>
                        <ul>
                            <li className={style.select_menu}>
                                <button className={style.select_button} onClick={() => handlerSelectMenu("내용")}>내용</button>
                            </li>
                            <li className={style.select_menu}>
                                <button className={style.select_button} onClick={() => handlerSelectMenu("글쓴이")}>글쓴이</button>
                            </li>
                            <li className={style.select_menu}>
                                <button className={style.select_button} onClick={() => handlerSelectMenu("제목")}>제목</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="text" className={style.search_id} title={style.search_id} placeholder="검색어 입력"></input>
                <button type="submit" className={style.search_btn}>검색</button>
            </div>
        </div>
    )
}

export default BoardPage;
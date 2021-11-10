import style from 'src/components/board/main/page/boardPage.module.css';
import React, {useState} from "react";
import Link from 'next/link'
import {ITypeProps} from "../BoardMain";
import {searchBoard} from "../../../../apis/Board";
import {useRouter} from "next/router";


export type TSelectMenu = 'USER' | 'CONTENT' | 'TITLE'

const BoardPage = (boardType : ITypeProps) : JSX.Element => {

    /* 추후 리스트 동적 생성 됨에따라 교체 예정 */
    const router = useRouter();
    const [showMenu,setShowMenu] = useState(false);
    const [selectMenu, setSelectMenu] = useState<TSelectMenu>('TITLE');
    const [payload, setPayload] = useState('');

    const handlerContentClick = () => {
        selectBarClick();
    }

    const selectBarClick = () => {
        setShowMenu(!showMenu);
    }

    const handlerSelectMenu = (menu: TSelectMenu) => {
        selectMenuClick(menu);
        selectBarClick();
    }

    const selectMenuClick = (menu : TSelectMenu) => {
        setSelectMenu(menu)
    }

    const onSearchBtnClick = async () => {
        const response = await searchBoard(selectMenu,payload);
        router.push('board/');
        console.log(response);
    }

    const onTextChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setPayload(e.target.value);
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
        </div>
    )
}

export default BoardPage;
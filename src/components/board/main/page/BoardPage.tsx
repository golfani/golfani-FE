import style from 'src/components/board/main/page/boardPage.module.css';
import React, {useState} from "react";
import Link from 'next/link'
import {ITypeProps} from "../BoardMain";
import {searchBoard} from "../../../../apis/Board";
import {useRouter} from "next/router";
import BoardSearchBar from "./BoardSearchBar";


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
        router.push(`board/searchResult?selectMenu=${selectMenu}&payload=${payload}`);
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
            <BoardSearchBar/>
        </div>
    )
}

export default BoardPage;
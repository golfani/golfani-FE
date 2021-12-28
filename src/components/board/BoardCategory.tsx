import style from 'src/components/board/boardCategory.module.css';
import {useEffect, useState} from 'react';
import {EBoardType} from "src/domain/board";
import {useRouter} from "next/router";

interface IBoardTypeProps {
    onSetBoardType : (type:EBoardType) => void
}

const BoardCategory = (props: IBoardTypeProps): JSX.Element => {
    const router = useRouter();
    const {type} = router.query;
    const [selectMenu, setMenu] = useState<EBoardType>(type as EBoardType);

    useEffect(()=>{
        if(type === undefined) {
            props.onSetBoardType(EBoardType.FREE);
            setMenu(EBoardType.FREE);
        }
    },[])

    useEffect(()=>{
        if(type !== undefined){
            props.onSetBoardType(type as EBoardType);
            setMenu(type as EBoardType);
        }
    },[type]);

    const menuClicked = (type : EBoardType) =>{
        if(type !== selectMenu) setMenu(type);
        props.onSetBoardType(type);
        router.push(`/board?type=${type}&page=0`);
    }

    return(
        <div className={style.container}>
            <div className={style.board_category}>
                <span className={style.category_style}>Category</span>
            </div>
            <ul className={style.menu_category}>
                <li className={selectMenu === EBoardType.FREE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EBoardType.FREE)}}>자유게시판</li>
                <li className={selectMenu === EBoardType.TIP ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EBoardType.TIP)}}>TIP게시판</li>
                <li className={selectMenu === EBoardType.TRADE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EBoardType.TRADE)}}>거래게시판</li>
                <li className={selectMenu === EBoardType.ANONYMOUS ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EBoardType.ANONYMOUS)}}>익명게시판</li>
            </ul>
        </div>
    )
}

export default BoardCategory;

import style from 'src/components/board/main/leftSideBar/boardLeftSideBar.module.css';
import {useState} from 'react';
import {EType} from "../../../../domain/board";

interface IBoardTypeProps {
    onSetBoardType : (type:EType) => void
}

const BoardLeftSideBar = (props: IBoardTypeProps): JSX.Element => {
    const [selectMenu, setMenu] = useState<EType>(EType.FREE); //default : 자유게시판
    const [getList, setGetList] = useState(false);

    const getMenuList = () : void =>{
        setGetList(!getList);
    }

    const menuClicked = (type : EType) =>{
        type === selectMenu ? setMenu(EType.FREE) : setMenu(type);
        props.onSetBoardType(type);
    }

    const handlerMouseOver = () => {
        getMenuList();
    }

    return(
        <div className={style.container}>
            <span onMouseOver={handlerMouseOver} className={style.menu_wrap}>menu</span>
            <div className={getList ? style.box_wrap : style.box_wrap_hidden}>
                <div className={selectMenu === EType.FREE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.FREE)}}>자유게시판</div>
                <div className={selectMenu === EType.TIP ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.TIP)}}>TIP게시판</div>
                <div className={selectMenu === EType.TRADE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.TRADE)}}>거래게시판</div>
                <div className={selectMenu === EType.ANONYMOUS ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.ANONYMOUS)}}>익명게시판</div>
            </div>
        </div>
    )
}

export default BoardLeftSideBar;
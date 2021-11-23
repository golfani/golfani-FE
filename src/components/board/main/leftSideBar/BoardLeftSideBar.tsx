import style from 'src/components/board/main/leftSideBar/boardLeftSideBar.module.css';
import {useEffect, useState} from 'react';
import {EType} from "../../../../domain/board";
import {useRouter} from "next/router";

interface IBoardTypeProps {
    onSetBoardType : (type:EType) => void
}

const BoardLeftSideBar = (props: IBoardTypeProps): JSX.Element => {

    const router = useRouter();
    const {type} = router.query;
    const [getList, setGetList] = useState(false);
    const [selectMenu, setMenu] = useState<EType>(type as EType);

    useEffect(()=>{
        if(type === undefined) {
            props.onSetBoardType(EType.FREE);
            setMenu(EType.FREE);
        }
    },[])

    useEffect(()=>{
        if(type !== undefined){
            props.onSetBoardType(type as EType);
            setMenu(type as EType);
        }
    },[type])

    const getMenuList = () : void =>{
        setGetList(!getList);
    }

    const menuClicked = (type : EType) =>{
        if(type !== selectMenu) setMenu(type);
        props.onSetBoardType(type);
        router.push(`/board?type=${type}&page=0`);
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
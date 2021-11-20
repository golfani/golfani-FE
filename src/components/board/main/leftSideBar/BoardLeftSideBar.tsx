import style from 'src/components/board/main/leftSideBar/boardLeftSideBar.module.css';
import {useEffect, useState} from 'react';
import {EType} from "../../../../domain/board";
import {useRouter} from "next/router";
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';

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
        window.location.href = `/board?type=${type}&page=0`
    }

    const onClickHome = () => {
        router.push('/');
    }
    const handlerMouseOver = () => {
        getMenuList();
    }

    return(
        <div className={style.container}>
            <div className={style.board_category}>
                <span className={style.category_style}>Category</span>
            </div>
            <ul className={style.menu_category}>
                <div className={style.home_menu}>
                    <HomeIcon/>
                    <li onClick={onClickHome}> Home</li>
                </div>
                <div className={style.home_menu}>
                    <AppsIcon/>
                    <li onMouseOver={handlerMouseOver} className={style.main_menu} >Menu</li>
                </div>
                <ul className={getList ? style.menu_type : style.box_wrap_hidden}>
                    <li className={selectMenu === EType.FREE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.FREE)}}>자유게시판</li>
                    <li className={selectMenu === EType.TIP ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.TIP)}}>TIP게시판</li>
                    <li className={selectMenu === EType.TRADE ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.TRADE)}}>거래게시판</li>
                    <li className={selectMenu === EType.ANONYMOUS ? style.board_menu_clicked : style.board_menu_default } onClick={() => {menuClicked(EType.ANONYMOUS)}}>익명게시판</li>
                </ul>
            </ul>

        </div>
    )
}

export default BoardLeftSideBar;
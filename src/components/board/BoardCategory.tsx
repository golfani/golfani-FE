import style from 'src/components/board/boardCategory.module.css';
import {useEffect, useState} from 'react';
import {EBoardType} from "src/domain/board";
import {useRouter} from "next/router";
import HomeIcon from '@material-ui/icons/Home';

interface IBoardTypeProps {
    onSetBoardType : (type:EBoardType) => void
}

const BoardCategory = (props: IBoardTypeProps): JSX.Element => {
    const router = useRouter();
    const {type} = router.query;
    const [selectMenu, setMenu] = useState<EBoardType>(type as EBoardType);

    useEffect(()=>{
        if(type === undefined) {
            props.onSetBoardType(EBoardType.HOME);
            setMenu(EBoardType.HOME);
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
        if(type === EBoardType.HOME) {
            router.push('/board');
        } else {
            router.push(`/board?type=${type}&page=0`);
        }
        props.onSetBoardType(type);
    }

    return(
        <div className={style.container}>
            <ul className={style.menu_category}>
                <HomeIcon className={selectMenu === EBoardType.HOME ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.HOME)}}/>
                <li className={selectMenu === EBoardType.FREE ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.FREE)}}>자유게시판</li>
                <li className={selectMenu === EBoardType.TIP ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.TIP)}}>TIP게시판</li>
                <li className={selectMenu === EBoardType.TRADE ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.TRADE)}}>거래게시판</li>
                <li className={selectMenu === EBoardType.ANONYMOUS ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.ANONYMOUS)}}>익명게시판</li>
            </ul>
        </div>
    )
}

export default BoardCategory;
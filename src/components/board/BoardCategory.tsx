import style from 'src/components/board/boardCategory.module.css';
import {useState} from 'react';
import {EBoardType} from "src/domain/board";
import HomeIcon from '@material-ui/icons/Home';
import BoardSearchBar from "./search/BoardSearchBar";
import SearchIcon from '@material-ui/icons/Search';
import useCustomRouter from "src/hooks/routerHook";

interface IBoardTypeProps {
    onSetBoardType : (type:EBoardType) => void
    boardType : EBoardType
}

const BoardCategory = ({onSetBoardType, boardType}: IBoardTypeProps): JSX.Element => {
    const customRouter = useCustomRouter();
    const [openSearch, setOpenSearch] = useState(false);

    const menuClicked = (type : EBoardType) =>{
        if(type === EBoardType.HOME) {
            customRouter.onConflictRoute('/board');
        } else {
            customRouter.onConflictRoute(`/board?type=${type}&page=0`);
        }
        onSetBoardType(type);
    }

    const handleClickSearchIcon = () => {
        setOpenSearch(true);
    }

    return(
        <div className={style.container}>
            <ul className={style.menu_category}>
                <HomeIcon className={boardType === EBoardType.HOME ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.HOME)}}/>
                <li className={boardType === EBoardType.FREE ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.FREE)}}>자유게시판</li>
                <li className={boardType === EBoardType.ANONYMOUS ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.ANONYMOUS)}}>익명게시판</li>
                <li className={boardType === EBoardType.TIP ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.TIP)}}>정보게시판</li>
                <li className={boardType === EBoardType.REVIEW ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.REVIEW)}}>후기게시판</li>
                <li className={boardType === EBoardType.TRADE ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.TRADE)}}>거래게시판</li>
                <li className={boardType === EBoardType.ASK ? style.board_menu_clicked : style.board_menu_default} onClick={() => {menuClicked(EBoardType.ASK)}}>문의게시판</li>
            </ul>
            <div className={style.search_box}>
                {openSearch
                    ? <BoardSearchBar/>
                    : <SearchIcon className={style.search_icon} onClick={handleClickSearchIcon}/>
                }
            </div>
        </div>
    )
}

export default BoardCategory;

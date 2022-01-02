import style from './boardNavigation.module.css';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuIcon from '@material-ui/icons/Menu';
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getNextOrPrevPost, IBoardData} from "src/apis/Board";
import {IBoardProps} from "./BoardContent";

const BoardNavigation = ({board} : IBoardProps) : JSX.Element => {
    const router = useRouter();
    const {type, page} = router.query;

    const prevQuery = useQuery<IBoardData>(['prev',board.id], () => getNextOrPrevPost('NEXT',board.id,type as string));
    const nextQuery = useQuery<IBoardData>(['next',board.id], () => getNextOrPrevPost('PREV',board.id,type as string));

    const handleClickList = () => {
        router.push(`/board?type=${type}&page=${page}`);
    }

    const handleClickPrev = () => {
        prevQuery.data ?
            router.push(`/board/${prevQuery.data.id}?type=${type}&page=${page}`)
            : alert('이전글이 존재하지 않습니다.');
    }

    const handleClickNext = () => {
        nextQuery.data
            ? router.push(`/board/${nextQuery.data.id}?type=${type}&page=${page}`)
            : alert('다음글이 존재하지 않습니다.');
    }

    return (
        <div className={style.container}>
            <div className={style.nav_box} onClick={handleClickList}>
                <MenuIcon style={{fontSize : 20}}/>
                <span className={style.list_txt}>목록</span>
            </div>
            <div className={style.nav_box} onClick={handleClickPrev}>
                <KeyboardArrowUpIcon style={{fontSize : 22}}/>
                <span>이전</span>
            </div>
            <div className={style.nav_box} onClick={handleClickNext}>
                <KeyboardArrowDownIcon style={{fontSize : 22}}/>
                <span>다음</span>
            </div>
        </div>
    );
};

export default BoardNavigation;

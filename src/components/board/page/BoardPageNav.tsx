import style from './boardPageNav.module.css';
import {useRouter} from "next/router";
import useCustomRouter from "src/hooks/routerHook";

interface IBoardPageNumProps {
    totalPage : number
}

const BoardPageNav = ({totalPage} : IBoardPageNumProps) : JSX.Element => {
    const router = useRouter();
    const customRouter = useCustomRouter();
    const {page} = router.query;
    const nowPage = Number(page);
    const pageArray : number[] = [...Array(totalPage)].map((v,i) => i);
    const rootUrl = router.asPath.slice(0,router.asPath.length-1);

    const onNextPage = () => {
        nowPage < totalPage - 1 && customRouter.onConflictRoute(`${rootUrl + (nowPage + 1)}`);
    }

    const onFirstPage = () => {
        customRouter.onConflictRoute(`${rootUrl + 0}`);
    }

    const onLastPage = () => {
        customRouter.onConflictRoute(`${rootUrl + (totalPage - 1)}`);
    }

    const onPrevPage = () => {
        nowPage > 0 && customRouter.onConflictRoute(`${rootUrl + (nowPage - 1)}`);
    }

    const handleClickPageNum = (pageNum : number) => {
        customRouter.onConflictRoute(`${rootUrl + (pageNum)}`);
    }

    return(
        <div className={style.container}>
            <button className={style.move_btn} onClick={onFirstPage}>첫</button>
            <button className={style.move_btn} onClick={onPrevPage}>이전</button>
            <div className={style.number_box}>
                {pageArray.map((page) => (
                    <button
                        key={page}
                        className={nowPage === page ? style.number_active : style.number}
                        onClick={() => handleClickPageNum(page)}
                    >{page + 1}
                    </button>
                ))}
            </div>
            <button className={style.move_btn} onClick={onNextPage}>다음</button>
            <button className={style.move_btn} onClick={onLastPage}>끝</button>
        </div>
    )
}

export default BoardPageNav;

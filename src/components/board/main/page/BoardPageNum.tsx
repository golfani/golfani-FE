import style from './boardPageNum.module.css';
import {useRouter} from "next/router";

interface INumber{
    totalPage : number
}

const BoardPageNum = (totalPage : INumber) : JSX.Element => {

    const router = useRouter();
    const {type,page} = router.query;

    const onNextPage = () => {
        Number(page) < totalPage.totalPage ? window.location.href = `/board?type=${type}&page=${Number(page)+1}` : null;
    }

    const onFirstPage = () => {
        window.location.href = `/board?type=${type}&page=0`
    }

    const onLastPage = () => {
        window.location.href = `/board?type=${type}&page=${totalPage.totalPage-1}`
    }

    const onPrevPage = () => {
        Number(page) > 0 ? window.location.href = `/board?type=${type}&page=${Number(page)-1}` : null;
    }

    const onPageClick = (pageNum : number) => {
        if(typeof window !== undefined) {
            window.location.href = `/board?type=${type}&page=${Number(pageNum)}`;
        }
    }

    const makeNum = (totalPage : number) =>{
        let array = [];
        for(let i = 0 ; i < totalPage ; i++){
            array.push(<button className={Number(page) === i ? style.num_on : style.num} key={i} disabled={Number(page) === i ? true : false} name="page" onClick={()=>onPageClick(i)}>{i+1}</button>)
        }
        return array;
    }

    return(
        <div className={style.container}>
            <button className={style.num} onClick={onFirstPage}>{'<<'}</button>
            <button className={style.num} onClick={onPrevPage}>{'<'}</button>
            {
              makeNum(totalPage.totalPage)
            }
            <button className={style.num} onClick={onNextPage}>{'>'}</button>
            <button className={style.num} onClick={onLastPage}>{'>>'}</button>
        </div>
    )
}

export default BoardPageNum;
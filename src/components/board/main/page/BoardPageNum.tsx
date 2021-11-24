import style from './boardPageNum.module.css';
import {useRouter} from "next/router";

interface INumber {
    totalPage : number
}

const BoardPageNum = (totalPage : INumber) : JSX.Element => {

    const router = useRouter();
    const {type,page,payload,selectMenu} = router.query;

    const onNextPage = () => {
        if(payload === undefined){
            Number(page) < totalPage.totalPage -1 ?  router.push(`/board?type=${type}&page=${Number(page)+1}`) : null
        }
        else{
            Number(page) < totalPage.totalPage -1 ? router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=${Number(page)+1}`) : null
        }
    }

    const onFirstPage = () => {
        if(payload === undefined)  router.push(`/board?type=${type}&page=0`);
        else router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=0`);
    }

    const onLastPage = () => {
        if(payload === undefined) router.push(`/board?type=${type}&page=${totalPage.totalPage-1}`);
        else router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=${totalPage.totalPage-1}`);
    }

    const onPrevPage = () => {
        if(payload === undefined) Number(page) > 0 ? router.push(`/board?type=${type}&page=${Number(page)-1}`) : null;
        else Number(page) > 0 ? router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=${Number(page)-1}`) : null;
    }

    const onPageClick = (pageNum : number) => {
       if(payload === undefined){
           if(typeof window !== undefined) {
               router.push(`/board?type=${type}&page=${Number(pageNum)}`);
           }
       }
       else{
           if(typeof window !== undefined) {
               router.push(`/board/searchResult?selectMenu=${selectMenu}&payload=${payload}&page=${Number(pageNum)}`);
           }
       }
    }

    const makeNum = (totalPage : number) => {
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
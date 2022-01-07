import style from './boardMobileCategory.module.css';
import ListIcon from '/public/icon/list_ico.png';
import PopularIcon from '/public/icon/popular_ico.png';
import Image from 'next/image';
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";

const BoardMobileCategory = () : JSX.Element => {
    const router = useRouter();

    const handleClickCategory = (type : EBoardType) => {
        router.push(`/board?type=${type}&page=0`);
    }

    return (
        <div className={style.container}>
            <div className={style.category_container}>
                <div className={style.category_box}>
                    <Image src={PopularIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.HOT)}>인기게시판</button>
                </div>
            </div>
            <div className={style.category_container}>
                <span className={style.category_txt}>카테고리</span>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.FREE)}>자유게시판</button>
                </div>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.ANONYMOUS)}>익명게시판</button>
                </div>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.TIP)}>정보게시판</button>
                </div>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.REVIEW)}>후기게시판</button>
                </div>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.TRADE)}>거래게시판</button>
                </div>
                <div className={style.category_box}>
                    <Image src={ListIcon} width={25} height={25}/>
                    <button className={style.category_btn} onClick={()=>handleClickCategory(EBoardType.ASK)}>문의게시판</button>
                </div>
            </div>
        </div>
    );
};

export default BoardMobileCategory;

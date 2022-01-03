import style from './shopManageMenu.module.css';
import Link from 'next/link';
const ShopManageMenu = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.menu_title}>스토어 설정</div>
            <div className={style.line}></div>
            <div className={style.menu_wrap}>
                <Link href="#notice" scroll={true}>
                    <div className={style.menu_box} style={{backgroundColor: "#C4F2CE"}}>공지사항</div>
                </Link>
                <div className={style.menu_box} style={{backgroundColor: "#9FEBED"}}>판매상품 등록</div>
                <div className={style.menu_box} style={{backgroundColor: "#80CEBE"}}>광고배너</div>
                <div className={style.menu_box} style={{backgroundColor: "#C3E2DD"}}>방문예약 관리</div>
                <div className={style.menu_box}></div>
                <div className={style.menu_box}></div>
            </div>
        </div>
    )
}

export default ShopManageMenu;
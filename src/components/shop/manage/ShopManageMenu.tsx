import style from './shopManageMenu.module.css';

const ShopManageMenu = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.menu_title}>스토어 설정</div>
            <div className={style.line}></div>
            <div className={style.menu_wrap}>
                <div className={style.menu_box} style={{backgroundColor: "#C4F2CE"}}>공지사항</div>
                <div className={style.menu_box} style={{backgroundColor: "#9FEBED"}}>판매상품 등록</div>
                <div className={style.menu_box} style={{backgroundColor: "#80CEBE"}}>광고배너</div>
                <div className={style.menu_box}></div>
                <div className={style.menu_box}></div>
                <div className={style.menu_box}></div>
            </div>
        </div>
    )
}

export default ShopManageMenu;
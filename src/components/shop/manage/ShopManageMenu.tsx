import style from './shopManageMenu.module.css';
import Link from 'next/link';
import {useRouter} from "next/router";

type TManageMenu = 'notice' | 'saleItem' | 'advertisement' | 'reservation';

const ShopManageMenu = () : JSX.Element => {
    const router = useRouter();
    const {shop} = router.query
    const onClickHandler = (menu : TManageMenu) => {
        switch (menu){
            case 'notice':
                router.push(`/shop/manage/${shop}/Notice`);
                break;
            case 'saleItem':
                router.push(`/shop/manage/${shop}/ProductForSale`);
                break;
            case 'advertisement':
                router.push(`/shop/manage/${shop}/advertisement`);
                break;
            case "reservation":
                router.push(`/shop/manage/${shop}/Reservation`);
                break;
        }
    }

    return(
        <div className={style.container}>
            <div className={style.menu_title}>스토어 설정</div>
            <div className={style.line}></div>
            <div className={style.menu_wrap}>
                <Link href="#notice" scroll={true}>
                    <div className={style.menu_box} style={{backgroundColor: "#C4F2CE"}} onClick={ () => onClickHandler('notice')}>공지사항</div>
                </Link>
                <div className={style.menu_box} style={{backgroundColor: "#9FEBED"}} onClick={ () => onClickHandler('saleItem')}>판매상품 관리</div>
                <div className={style.menu_box} style={{backgroundColor: "#80CEBE"}} onClick={ () => onClickHandler('advertisement')}>광고배너</div>
                <div className={style.menu_box} style={{backgroundColor: "#C3E2DD"}} onClick={ () => onClickHandler('reservation')}>방문예약 관리</div>
                <div className={style.menu_box}></div>
                <div className={style.menu_box}></div>
            </div>
        </div>
    )
}

export default ShopManageMenu;
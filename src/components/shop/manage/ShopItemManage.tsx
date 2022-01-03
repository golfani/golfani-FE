import style from 'src/components/shop/manage/shopItemManage.module.css';
import {useState} from "react";
import ShopManageItemList from "./ShopManageItemList";

const Sale_State = {
    onSale: '판매중',
    soldOut: '판매완료',
    onReservation : '예약중',
    ask : '상품문의'
} as const

type Sale_State = typeof Sale_State[keyof typeof Sale_State];

const ShopItemManage = () : JSX.Element => {
    const [saleState, setSaleState] = useState<Sale_State>(Sale_State.onSale);

    const saleTypeClickHandler = (typeState : Sale_State) => {
        setSaleState(typeState);
    }

    const saleTypeCheck = (typeState : Sale_State) => {
        if (typeState === saleState) return true
        else return false;
    }

    return(
        <div className={style.container}>
            <div className={style.list_txt}>판매상품 관리</div>
            <div className={style.line}></div>
            <div className={style.list_type_wrap}>
                <div className={saleTypeCheck(Sale_State.onSale) ? style.head_txt_checked : style.head_txt} onClick={() => saleTypeClickHandler(Sale_State.onSale)}>{Sale_State.onSale}</div>
                <div className={saleTypeCheck(Sale_State.soldOut) ? style.head_txt_checked : style.head_txt} onClick={() => saleTypeClickHandler(Sale_State.soldOut)}>{Sale_State.soldOut}</div>
                <div className={saleTypeCheck(Sale_State.onReservation) ? style.head_txt_checked : style.head_txt} onClick={() => saleTypeClickHandler(Sale_State.onReservation)}>{Sale_State.onReservation}</div>
                <div className={saleTypeCheck(Sale_State.ask) ? style.head_txt_checked : style.head_txt} onClick={() => saleTypeClickHandler(Sale_State.ask)}>{Sale_State.ask}</div>
            </div>
            <ShopManageItemList/>
        </div>
    )
}

export default ShopItemManage;
import style from './shopItem.module.css'
const ShopItem = () : JSX.Element => {
    return(
        <div className={style.container}>
            <img className={style.item_img} src="http://img.danawa.com/prod_img/500000/724/250/img/12250724_1.jpg?shrink=330:330&_v=20211216145449"></img>
            <div className={style.item_state}>판매중</div>
            <div className={style.item_txt_wrap}>
                <div className={style.item_txt}>핑 G425 MAX 드라이버</div>
                <div className={style.item_info_wrap}>
                    <div className={style.item_price}>250,000원</div>
                    <div className={style.item_date_time}>1시간전</div>
                </div>

            </div>
        </div>
    )
}

export default ShopItem;
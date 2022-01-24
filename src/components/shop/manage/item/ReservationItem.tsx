import style from 'src/components/shop/manage/item/reservationItem.module.css';
const ReservationItem = () : JSX.Element =>{
    return(
        <div className={style.container}>
            <div className={style.item_table}>
                <img className={style.item_img}
                     src="http://img.danawa.com/prod_img/500000/724/250/img/12250724_1.jpg?shrink=330:330&_v=20211216145449"></img>
                <div className={style.item_info}>
                    <div>
                        <span className={style.item_name_txt}>상품이름:</span>
                        <span> G425 MAX 드라이버 남성 ALTA J CB SLATE</span>
                    </div>
                    <div>
                        <span className={style.item_price_txt}>상품가격:</span>
                        <span> 120,000원</span>
                    </div>
                    <div>
                        <span className={style.item_condition_txt}>상태:</span>
                        <span> 중고(A)</span>
                    </div>
                    <div>
                        <span className={style.item_condition_txt}>판매자:</span>
                        <span> 수원골파니</span>
                    </div>
                    <div>
                        <span className={style.item_condition_txt}>승인여부:</span>
                        <label><input type="checkbox"/></label>승인
                        <label><input type="checkbox"/></label>미승인
                    </div>
            </div>
            </div>
            <div className={style.question_box}>
                <span>문의사항이 기입될 장소입니다.</span>
            </div>
            <div className={style.connect_btn}>
                예약자연결
            </div>
        </div>
    )
}

export default ReservationItem;
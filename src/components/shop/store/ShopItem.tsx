import style from './shopItem.module.css';

const ShopItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <img src={'/golf_club.webp'} className={style.img}/>
            <span className={style.brand_name_txt}>핑</span>
            <span className={style.item_name_txt}>에픽 맥스 패스트 드라이버</span>
            <div className={style.price_box}>
                <span className={style.sale_price_txt}>255,000원</span>
                <span className={style.price_txt_sale}>269,000원</span>
                <span className={style.discount_rate_txt}>5%</span>
            </div>
            <div>
                <span className={style.review_count_txt}>리뷰수</span>
                <span className={style.count_number_txt}>25</span>
                <span className={style.review_rate_txt}>평점</span>
                <span className={style.count_number_txt}>4.3 / 5</span>
            </div>
            <span className={style.interest_txt}>12명의 회원님이 해당상품을 관심있어합니다</span>
            <div className={style.tag_box}>
                <span className={style.low_price_tag}>최저가 보장</span>
                <span className={style.special_price_tag}>특가</span>
            </div>
        </div>
    );
};

export default ShopItem;
import style from './shopRelatedItem.module.css';

const ShopRelatedItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>회원님이 좋아할만한 상품</span>
            <div className={style.item_container}>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
                <div className={style.item_box}>
                    <img src={'/golf_club.webp'} className={style.item_img}/>
                    <span className={style.brand_name_txt}>혼마 (HONMA)</span>
                    <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                    <div>
                        <span className={style.default_price_txt}>580,000</span>
                        <span className={style.sale_price_txt}>319,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopRelatedItem;

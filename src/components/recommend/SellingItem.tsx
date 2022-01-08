import style from './sellingItem.module.css';

const SellingItem = () : JSX.Element => {
    return (
        <div>
            <div className={style.item_box}>
                <img className={style.img}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.seller_txt}>Lee_Yong 님이 판매하시는 상품 입니다.</span>
                </div>
                <div className={style.price_box}>
                    <span className={style.price_txt}>169,000 원</span>
                    <span className={style.buy_txt}>구매하기</span>
                </div>
            </div>
            <div className={style.item_box}>
                <img className={style.img}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.seller_txt}>Lee_Yong 님이 판매하시는 상품 입니다.</span>
                </div>
                <div className={style.price_box}>
                    <span className={style.price_txt}>169,000 원</span>
                    <span className={style.buy_txt}>구매하기</span>
                </div>
            </div>
            <div className={style.item_box}>
                <img className={style.img}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.seller_txt}>Lee_Yong 님이 판매하시는 상품 입니다.</span>
                </div>
                <div className={style.price_box}>
                    <span className={style.price_txt}>169,000 원</span>
                    <span className={style.buy_txt}>구매하기</span>
                </div>
            </div>
            <div className={style.item_box}>
                <img className={style.img}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.seller_txt}>Lee_Yong 님이 판매하시는 상품 입니다.</span>
                </div>
                <div className={style.price_box}>
                    <span className={style.price_txt}>169,000 원</span>
                    <span className={style.buy_txt}>구매하기</span>
                </div>
            </div>
            <div className={style.item_box}>
                <img className={style.img}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.seller_txt}>Lee_Yong 님이 판매하시는 상품 입니다.</span>
                </div>
                <div className={style.price_box}>
                    <span className={style.price_txt}>169,000 원</span>
                    <span className={style.buy_txt}>구매하기</span>
                </div>
            </div>
        </div>
    );
};

export default SellingItem;

import style from './shopItemInfo.module.css';
import ShopItemImage from "./ShopItemImage";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const ShopItemInfo = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ShopItemImage/>
            <div className={style.info_container}>
                <div className={style.info_box}>
                    <div className={style.name_box}>
                        <span className={style.brand_txt}>혼마 (HONMA)</span>
                        <div className={style.name_sub_box}>
                            <span className={style.item_name_txt}>혼마 비즐 535 드라이버</span>
                            <ShareOutlinedIcon className={style.share_icon}/>
                        </div>
                    </div>
                    <div className={style.price_info_box}>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>기존 판매가</span>
                            <span className={style.default_price_txt}>580,000원</span>
                        </div>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>할인 판매가</span>
                            <span className={style.sale_price_txt}>319,000원</span>
                            <span className={style.sale_ratio_txt}>45%</span>
                            <ArrowDropDownIcon className={style.arrow_down_icon}/>
                        </div>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>적립 포인트</span>
                            <span className={style.point_txt}>957원 적립</span>
                        </div>
                    </div>
                    <div className={style.payment_info_box}>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>배송정보</span>
                            <span className={style.delivery_txt}>전국무료배송</span>
                        </div>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>카드 무이자</span>
                            <span className={style.card_no_interest_txt}>최대 6개월 무이자</span>
                        </div>
                        <div className={style.desc_box}>
                            <span className={style.info_txt}>제조사(원산지)</span>
                            <span className={style.manufacturer_txt}>혼마(일본)</span>
                        </div>
                    </div>
                    <div className={style.option_box}>
                        <span className={style.info_txt}>옵션 선택</span>
                        <select className={style.option_select_box}>
                            <option value='default'>옵션을 선택해주세요</option>
                            <option value='option_1'>옵션 1</option>
                            <option value='option_2'>옵션 2</option>
                        </select>
                    </div>
                    <div className={style.visit_service_box}>
                        <span className={style.info_txt}>방문/예약 서비스</span>
                        <button className={style.visit_btn}>방문 예약하기</button>
                    </div>
                </div>
                <div className={style.pay_box}>
                    <div className={style.total_price_box}>
                        <span className={style.total_price_desc_txt}>총 합계금액</span>
                        <span className={style.total_price_txt}>319,000</span>
                    </div>
                    <div className={style.menu_box}>
                        <button className={style.favorite_btn}>관심등록</button>
                        <button className={style.notification_btn}>입고알림</button>
                        <button className={style.ask_btn}>상품문의</button>
                        <button className={style.buy_btn}>구매하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopItemInfo;

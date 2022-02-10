import style from './shopBasket.module.css';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";

interface IShopBasketProps {
    setModalOpen: (state: boolean) => void
}

const ShopItemHistory = (props: IShopBasketProps): JSX.Element => {
    const [close, setClose] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onModalClose = () => {
        setClose(true);
        setTimeout(() => {
            props.setModalOpen(false);
        }, 200);
    }

    const handleClickBackIcon = () => {
        onModalClose();
    }

    handleClickRefOutSide(ref, onModalClose);

    return (
        <div className={'modal_container'}>
            <div className={close ? style.container_close : style.container} ref={ref}>
                <div className={style.title_box}>
                    <ArrowBackIosNewIcon className={style.icon} onClick={handleClickBackIcon}/>
                    <span className={style.title_txt}>장바구니</span>
                </div>
                <div className={style.describe_box}>
                    <span className={style.d_product_txt}>상품</span>
                    <span className={style.d_price_txt}>가격</span>
                    <span className={style.d_quantity_txt}>수량</span>
                    <span className={style.d_total_txt}>총 금액</span>
                </div>
                <div className={style.item_container}>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <div className={style.item_info_box}>
                            <span className={style.item_txt}>[핑] 에픽 맥스 패스트 드라이버</span>
                            <span className={style.item_option_txt}>옵션 : 선택01_BLACK</span>
                        </div>
                        <span className={style.item_price_txt}>69,300</span>
                        <div className={style.item_quantity_box}>
                            <span className={style.item_quantity_txt}>2</span>
                        </div>
                        <span className={style.item_total_price_txt}>1,386,000</span>
                    </div>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <div className={style.item_info_box}>
                            <span className={style.item_txt}>[핑] 에픽 맥스 패스트 드라이버</span>
                            <span className={style.item_option_txt}>옵션 : 선택01_BLACK</span>
                        </div>
                        <span className={style.item_price_txt}>693,000</span>
                        <div className={style.item_quantity_box}>
                            <span className={style.item_quantity_txt}>2</span>
                        </div>
                        <span className={style.item_total_price_txt}>1,386,000</span>
                    </div>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <div className={style.item_info_box}>
                            <span className={style.item_txt}>[핑] 에픽 맥스 패스트 드라이버</span>
                            <span className={style.item_option_txt}>옵션 : 선택01_BLACK</span>
                        </div>
                        <span className={style.item_price_txt}>2,693,000</span>
                        <div className={style.item_quantity_box}>
                            <span className={style.item_quantity_txt}>2</span>
                        </div>
                        <span className={style.item_total_price_txt}>1,386,000</span>
                    </div>
                </div>
                <div className={style.result_box}>
                    <div className={style.price_result_box}>
                        <span className={style.price_result_txt}>결제 예정금액</span>
                        <span className={style.total_price_txt}>1,200,000</span>
                        <span className={style.won_txt}>원</span>
                    </div>
                    <div className={style.result_btn_box}>
                        <button className={style.clear_btn}>비우기</button>
                        <button className={style.order_btn}>주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopItemHistory;

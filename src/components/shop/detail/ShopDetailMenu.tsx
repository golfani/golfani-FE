import style from './shopDetailMenu.module.css';
import ShopItemReviewList from "./ShopItemReviewList";

const ShopDetailMenu = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.menu_box}>
                <span className={style.menu_list}>상품 사진</span>
                <span className={style.menu_list_active}>상품 평 (23)</span>
                <span className={style.menu_list}>교환/환불/배송</span>
            </div>
            <ShopItemReviewList/>
        </div>
    )
};

export default ShopDetailMenu;

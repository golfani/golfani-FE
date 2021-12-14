import style from "./shopProduct.module.css";
import ShopOption from "./ShopOption";
import ShopSort from "./ShopSort";
import ShopItemList from "./ShopItemList";

const ShopProduct = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.menu_title_txt}>전체상품</span>
            <ShopOption/>
            <ShopSort/>
            <ShopItemList/>
        </div>
    );
};

export default ShopProduct;

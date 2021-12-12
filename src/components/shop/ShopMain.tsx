import style from './shopMain.module.css';
import ShopOption from "./ShopOption";
import ShopSort from "./ShopSort";
import ShopItemList from "./ShopItemList";

const ShopMain = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.menu_title_txt}>전체상품</span>
            <ShopOption/>
            <ShopSort/>
            <ShopItemList/>
        </div>
    );
};

export default ShopMain;

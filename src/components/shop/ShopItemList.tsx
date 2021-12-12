import style from './shopItemList.module.css';
import ShopItem from "./ShopItem";

const ShopItemList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
        </div>
    );
};

export default ShopItemList;

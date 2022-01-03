import style from './shopManageItemList.module.css';
import ShopItem from "./ShopItem";

const ShopManageItemList = () : JSX.Element => {
    return(
        <div className={style.container}>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
            <ShopItem/>
        </div>
    )
}

export default ShopManageItemList;
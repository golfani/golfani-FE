import style from './shopManageItemList.module.css';
import ShopItem from "./ShopItem";

const ShopManageItemList = () : JSX.Element => {
    return(
        <div className={style.container}>
                <div className={style.item_wrap}>
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
        </div>
    )
}

export default ShopManageItemList;
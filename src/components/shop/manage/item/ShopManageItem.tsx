import style from 'src/components/shop/manage/item/shopManageItem.module.css';
import ShopItemManage from "./ShopItemManage";
import Navbar from "../../../common/navbar/Navbar";
import ShopItemAdd from "./ShopItemAdd";

const ShopManageItem = () : JSX.Element => {
    return(
        <div className={style.container}>
            <Navbar/>
            <ShopItemManage/>
            <ShopItemAdd/>
        </div>
    )
}

export default ShopManageItem;

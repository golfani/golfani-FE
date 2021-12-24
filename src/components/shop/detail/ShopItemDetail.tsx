import style from './shopItemDetail.module.css';
import ShopItemInfo from "./ShopItemInfo";
import ShopRelatedItem from "./ShopRelatedItem";
import ShopDetailMenu from "./ShopDetailMenu";

const ShopItemDetail = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ShopItemInfo/>
            <ShopRelatedItem/>
            <ShopDetailMenu/>
        </div>
    );
};

export default ShopItemDetail;

import style from './shopHotList.module.css';
import ShopItem from "../store/ShopItem";

const ShopHotList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>인기 상품</span>
            <div className={style.item_box}>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
            </div>
        </div>
    );
};

export default ShopHotList;

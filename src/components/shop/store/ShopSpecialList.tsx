import style from './shopSpecialList.module.css';
import ShopItem from "./ShopItem";

const ShopSpecialList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>특가 할인</span>
            <div className={style.item_box}>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
            </div>
        </div>
    );
};

export default ShopSpecialList;

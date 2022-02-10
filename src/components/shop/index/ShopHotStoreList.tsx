import style from './shopHotStoreList.module.css';
import ShopStoreItem from "./ShopStoreItem";

const ShopHotStoreList = (): JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.store_list_txt}>금주의 인기 매장</span>
                <div className={style.store_item_container}>
                </div>
            </div>
        </div>
    );
};

export default ShopHotStoreList;

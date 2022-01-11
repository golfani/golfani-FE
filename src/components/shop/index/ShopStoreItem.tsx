import style from './shopStoreItem.module.css';
import {IShopStoreDto} from "./ShopStoreList";

interface IShopStoreItemProps {
    store : IShopStoreDto
}

const ShopStoreItem = ({store} : IShopStoreItemProps) : JSX.Element => {
    return (
        <div className={style.container}>
            <img className={style.img} src={`golfShop_img${store.id}.jpeg`}/>
            <div className={style.shop_info_box}>
                <span className={style.shop_name_txt}>{store.name}</span>
                <span className={style.shop_location_txt}>{store.location}</span>
                <span>평점 ⭐⭐⭐⭐⭐️️️️</span>
            </div>
        </div>
    );
};

export default ShopStoreItem;

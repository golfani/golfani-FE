import style from './shopStoreItem.module.css';
import {IShopDto} from "src/apis/Shop";
import {useRouter} from "next/router";

interface IShopStoreItemProps {
    store : IShopDto
}

const ShopStoreItem = ({store} : IShopStoreItemProps) : JSX.Element => {
    const router = useRouter();

    const handleClickShop = () => {
        router.push(`/shop/${store.id}`);
    }

    return (
        <div className={style.container} onClick={handleClickShop}>
            <img className={style.img} src={store.imgSrc}/>
            <div className={style.shop_info_box}>
                <span className={style.shop_name_txt}>{store.shopName}</span>
                <span className={style.shop_location_txt}>{store.location}</span>
                <span>⭐ 4.2️️️</span>
            </div>
        </div>
    );
};

export default ShopStoreItem;

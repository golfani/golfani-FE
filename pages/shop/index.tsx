import style from 'styles/shop.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import ShopSearch from "src/components/shop/ShopSearch";
import ShopHotStoreList from "src/components/shop/ShopHotStoreList";
import ShopRecommendGolfClub from "src/components/shop/ShopRecommendGolfClub";

const Shop = () : JSX.Element => {
    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.shop_main_box}>
                <span className={style.shop_txt}>SHOP</span>
                <ShopSearch/>
                <ShopHotStoreList/>
                <ShopRecommendGolfClub/>
            </div>
        </div>
    );
};

export default Shop;

import style from 'styles/shop.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import ShopSearch from "src/components/shop/ShopSearch";
import ShopHotStoreList from "src/components/shop/ShopHotStoreList";
import ShopRecommendGolfClub from "src/components/shop/ShopRecommendGolfClub";
import {useState} from "react";
import ShopRegisterModal from "src/components/modals/ShopRegisterModal";

const Shop = () : JSX.Element => {
    const [openShopRegisterModal, setOpenShopRegisterModal] = useState(false);

    const handleClickShopAddButton = () => {
        setOpenShopRegisterModal(true);
    }

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.shop_main_box}>
                <span className={style.shop_txt}>SHOP</span>
                <ShopSearch/>
                <ShopHotStoreList/>
                <ShopRecommendGolfClub/>
                {openShopRegisterModal && <ShopRegisterModal setModalOpen={setOpenShopRegisterModal}/>}
            </div>
            <div className={style.shop_add_box} onClick={handleClickShopAddButton}>
                <img src={'/icon/shop_ico.png'} alt={'shop_add'} className={style.shop_img}/>
                <div>
                    <span className={style.shop_add_txt}>스토어 등록</span>
                    <span className={style.shop_add_sub_txt}>운영중인 매장을 등록해보세요</span>
                </div>
            </div>
        </div>
    );
};

export default Shop;

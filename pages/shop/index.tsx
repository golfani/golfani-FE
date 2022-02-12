import style from 'styles/shop.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import ShopSearch from "src/components/shop/index/ShopSearch";
import ShopHotReviewList from "src/components/shop/index/ShopHotReviewList";
import ShopRecommendGolfClub from "src/components/shop/index/ShopRecommendGolfClub";
import {useEffect, useState} from "react";
import ShopRegisterModal from "src/components/modals/shop/ShopRegisterModal";
import ShopFloatingMenu from "src/components/shop/floatingMenu/ShopFloatingMenu";
import {getCookie} from "src/utils/cookieUtil";

const Shop = (): JSX.Element => {
    const [openShopRegisterModal, setOpenShopRegisterModal] = useState(false);
    const [shopRegisterMenuOpen, setShopRegisterMenuOpen] = useState<boolean>(false);
    const userId = getCookie('userId');

    const handleClickShopAddButton = () => {
        setOpenShopRegisterModal(true);
    }

    const handleClickCloseRegisterMenuButton = () => {
        if (confirm("스토어 등록이 사이트에서 표시되지 않습니다.\n스토어 등록시 마이페이지를 이용해 주세요.")) {
            window.localStorage.setItem('storeRegister', 'true');
            setShopRegisterMenuOpen(false);
        }
        else {
        }
    }

    const checkShopRegister = () : boolean => {
        return !!window.localStorage.getItem('storeRegister');
    }

    useEffect(()=> {
        if (checkShopRegister()) {
            setShopRegisterMenuOpen(false);
        } else {
            setShopRegisterMenuOpen(true);
        }
    },[])

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.shop_main_box}>
                <ShopSearch/>
                <ShopHotReviewList/>
                <ShopRecommendGolfClub/>
                {openShopRegisterModal && <ShopRegisterModal setModalOpen={setOpenShopRegisterModal}/>}
            </div>
            {shopRegisterMenuOpen && userId &&
            <div className={style.shop_add_container}>
                <button className={style.close_btn} onClick={handleClickCloseRegisterMenuButton}>X</button>
                <div className={style.shop_add_box} onClick={handleClickShopAddButton}>
                    <img src={'/icon/shop_ico.png'} alt={'shop_add'} className={style.shop_img}/>
                    <div>
                        <span className={style.shop_add_txt}>스토어 등록</span>
                        <span className={style.shop_add_sub_txt}>운영중인 매장을 등록해보세요</span>
                    </div>
                </div>
            </div>
            }
            <ShopFloatingMenu/>
        </div>
    );
};

export default Shop;

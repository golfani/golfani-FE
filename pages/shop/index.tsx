import style from 'styles/shop.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import ShopSearch from "src/components/shop/index/ShopSearch";
import ShopHotStoreList from "src/components/shop/index/ShopHotStoreList";
import ShopRecommendGolfClub from "src/components/shop/index/ShopRecommendGolfClub";
import {useEffect, useState} from "react";
import ShopRegisterModal from "src/components/modals/shop/ShopRegisterModal";
import ShopFloatingMenu from "src/components/shop/floatingMenu/ShopFloatingMenu";
import FavoriteRegionModal from "src/components/modals/shop/FavoriteRegionModal";
import {getMember} from "src/apis/Member";
import {getCookie} from "src/utils/cookieUtil";
import {useQuery} from "react-query";

const Shop = (): JSX.Element => {
    const [openShopRegisterModal, setOpenShopRegisterModal] = useState(false);
    const [shopRegisterMenuOpen, setShopRegisterMenuOpen] = useState(true);
    const [regCode, setRegCode] = useState<number | null>(null);
    const [openFavoriteRegionModal, setOpenFavoriteRegionModal] = useState(false);
    const userId = getCookie('userId');
    const memberQuery = useQuery(['member', userId], () => getMember(userId), {
        enabled: userId != undefined,
        staleTime: 1000 * 60 * 10
    });

    const handleClickShopAddButton = () => {
        setOpenShopRegisterModal(true);
    }

    const handleClickCloseRegisterMenuButton = () => {
        setShopRegisterMenuOpen(false);
    }

    useEffect(() => {
        if (memberQuery.isSuccess) {
            if (memberQuery.data?.regCode) {
                setRegCode(memberQuery.data.regCode);
                setOpenFavoriteRegionModal(false);
            } else {
                setOpenFavoriteRegionModal(true);
            }
        }
    }, [memberQuery.isSuccess]);

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.shop_main_box}>
                {/*<span className={style.shop_txt}>SHOP</span>*/}
                <ShopSearch/>
                <ShopHotStoreList/>
                <ShopRecommendGolfClub/>
                {openShopRegisterModal && <ShopRegisterModal setModalOpen={setOpenShopRegisterModal}/>}
            </div>
            {shopRegisterMenuOpen &&
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
            {openFavoriteRegionModal && <FavoriteRegionModal setOpenModal={setOpenFavoriteRegionModal}/>}
        </div>
    );
};

export default Shop;

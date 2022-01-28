import style from './shopFloatingMenu.module.css';
import ShopStoreHistory from "./ShopStoreHistory";
import {useState} from "react";
import ShopItemHistory from "./ShopItemHistory";
import ShopBasket from "./ShopBasket";

const ShopFloatingMenu = (): JSX.Element => {
    const [openStoreHistory, setOpenStoreHistory] = useState(false);
    const [openItemHistory, setOpenItemHistory] = useState(false);
    const [openBasket, setOpenBasket] = useState(false);

    const handleClickStoreHistory = () => {
        setOpenStoreHistory(true);
    }

    const handleClickItemHistory = () => {
        setOpenItemHistory(true);
    }

    const handleClickBasket = () => {
        setOpenBasket(true);
    }

    return (
        <div className={style.container}>
            <ul className={style.menu_box}>
                <li className={style.menu_list}>
                    <span className={style.menu_txt} onClick={handleClickStoreHistory}>최근 <br/>스토어</span>
                    {openStoreHistory && <ShopStoreHistory setModalOpen={setOpenStoreHistory}/>}
                </li>
                <li className={style.menu_list}>
                    <span className={style.menu_txt} onClick={handleClickItemHistory}>최근 상품</span>
                    {openItemHistory && <ShopItemHistory setModalOpen={setOpenItemHistory}/>}
                </li>
                <li className={style.menu_list}>
                    <span className={style.menu_txt} onClick={handleClickBasket}>찜 상품</span>
                    {openBasket && <ShopBasket setModalOpen={setOpenBasket}/>}
                </li>
            </ul>
        </div>
    );
};

export default ShopFloatingMenu;

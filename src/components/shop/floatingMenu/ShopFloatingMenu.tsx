import style from './shopFloatingMenu.module.css';
import ShopStoreHistory from "./ShopStoreHistory";
import {useState} from "react";
import ShopItemHistory from "./ShopItemHistory";

const ShopFloatingMenu = () : JSX.Element => {
    const [openStoreHistory, setOpenStoreHistory] = useState(false);
    const [openItemHistory, setOpenItemHistory] = useState(false);

    const handleClickStoreHistory = () => {
        setOpenStoreHistory((openStoreHistory) => !openStoreHistory);
        setOpenItemHistory(false);
    }

    const handleClickItemHistory = () => {
        setOpenItemHistory((openItemHistory) => !openItemHistory);
        setOpenStoreHistory(false);
    }

    return (
        <div className={style.container}>
            <ul className={style.menu_box}>
                <li className={style.menu_list}>
                    <span className={style.menu_txt} onClick={handleClickStoreHistory}>최근 <br/>스토어</span>
                    {openStoreHistory && <ShopStoreHistory/>}
                </li>
                <li className={style.menu_list}>
                    <span className={style.menu_txt} onClick={handleClickItemHistory}>최근 상품</span>
                    {openItemHistory && <ShopItemHistory/>}
                </li>
                <li className={style.menu_list}>
                    <span className={style.menu_txt}>찜 상품</span>
                </li>
            </ul>
        </div>
    );
};

export default ShopFloatingMenu;

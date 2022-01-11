import style from 'styles/shop.module.css';
import {useRouter} from "next/router";
import Navbar from "src/components/common/navbar/Navbar";
import ShopTitle from "src/components/shop/store/ShopTitle";
import ShopMenu from "src/components/shop/store/ShopMenu";
import ShopMain from "src/components/shop/store/ShopMain";
import ShopFloatingMenu from "src/components/shop/floatingMenu/ShopFloatingMenu";

const ShopPage = () : JSX.Element => {

    return (
        <div className={style.container}>
            <Navbar/>
            <ShopTitle/>
            <ShopMenu/>
            <ShopMain/>
            <ShopFloatingMenu/>
        </div>
    );
};

export default ShopPage;

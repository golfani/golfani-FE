import style from 'styles/shop.module.css';
import {useRouter} from "next/router";
import Navbar from "src/components/common/navbar/Navbar";
import ShopTitle from "src/components/shop/ShopTitle";
import ShopMenu from "src/components/shop/ShopMenu";
import ShopMain from "src/components/shop/ShopMain";

const ShopPage = () : JSX.Element => {
    const router = useRouter();
    const {shop} = router.query;

    return (
        <div className={style.container}>
            <Navbar/>
            <ShopTitle/>
            <ShopMenu/>
            <ShopMain/>
        </div>
    );
};

export default ShopPage;

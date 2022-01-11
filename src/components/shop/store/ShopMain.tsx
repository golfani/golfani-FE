import style from './shopMain.module.css';
import ShopIntroduce from "./ShopIntroduce";
import ShopFooter from "./ShopFooter";
import ShopProduct from "./ShopProduct";
import {useRouter} from "next/router";
import ShopItemDetail from "../detail/ShopItemDetail";

const ShopMain = () : JSX.Element => {
    const router = useRouter();
    const {param} = router.query;

    return (
        <div className={style.container}>
            {param?.length === 1 && <ShopIntroduce/>}
            {param?.length === 2 && <ShopProduct/>}
            {param?.length === 3 && <ShopItemDetail/>}
            <ShopFooter/>
        </div>
    );
};

export default ShopMain;

import style from './shopMain.module.css';
import ShopIntroduce from "./ShopIntroduce";
import ShopFooter from "./ShopFooter";
import ShopProduct from "./ShopProduct";

const ShopMain = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ShopIntroduce/>
            {/*<ShopProduct/>*/}
            <ShopFooter/>
        </div>
    );
};

export default ShopMain;
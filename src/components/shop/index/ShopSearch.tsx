import ShopSearchMenu from "./ShopSearchMenu";
import ShopMap from "./ShopMap";
import ShopStoreList from "./ShopStoreList";
import style from './shopSearch.module.css'

const ShopSearch = (): JSX.Element => {
    return (
        <div className={style.container}>
            {/*<ShopMap/>*/}
            {/*<ShopSearchMenu/>*/}
            <ShopStoreList/>
        </div>
    );
};

export default ShopSearch;

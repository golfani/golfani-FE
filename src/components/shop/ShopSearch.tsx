import ShopSearchMenu from "./ShopSearchMenu";
import ShopMap from "./ShopMap";
import ShopStoreList from "./ShopStoreList";

const ShopSearch = () : JSX.Element => {
    return (
        <div>
            <ShopMap/>
            <ShopSearchMenu/>
            <ShopStoreList/>
        </div>
    );
};

export default ShopSearch;

import Navbar from "../../src/components/common/navbar/Navbar";
import ShopInfo from "../../src/components/shop/manage/ShopInfo";
import ShopManageMenu from "../../src/components/shop/manage/ShopManageMenu";

const ShopManagePage = () : JSX.Element =>{
    return(
        <div>
            <Navbar/>
            <ShopInfo/>
            <ShopManageMenu/>
        </div>
    )
}

export default ShopManagePage;
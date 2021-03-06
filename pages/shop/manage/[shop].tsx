import Navbar from "src/components/common/navbar/Navbar";
import ShopInfo from "src/components/shop/manage/ShopInfo";
import ShopManageMenu from "src/components/shop/manage/ShopManageMenu";
import ShopNotice from "src/components/shop/manage/ShopNotice";

const ShopManagePage = () : JSX.Element =>{
    return(
        <div>
            <Navbar/>
            <ShopInfo/>
            <ShopManageMenu/>
            <ShopNotice/>
        </div>
    )
}

export default ShopManagePage;
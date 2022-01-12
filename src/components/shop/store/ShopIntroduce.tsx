import ShopPromotion from "./ShopPromotion";
import ShopNoticeList from "./ShopNoticeList";
import ShopSpecialList from "./ShopSpecialList";
import ShopHotList from "../index/ShopHotList";

const ShopIntroduce = () : JSX.Element => {
    return (
        <div>
            <ShopPromotion/>
            <ShopNoticeList/>
            <ShopSpecialList/>
            <ShopHotList/>
        </div>
    );
};

export default ShopIntroduce;

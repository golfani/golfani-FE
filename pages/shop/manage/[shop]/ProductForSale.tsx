import dynamic from "next/dynamic";

const ShopManageItem = dynamic(() => import("src/components/shop/manage/item/ShopManageItem"))

const ProductForSale = (): JSX.Element => {
    return (
        <div>
            <ShopManageItem/>
        </div>
    )
}

export default ProductForSale;

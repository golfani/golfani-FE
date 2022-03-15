import dynamic from "next/dynamic";

const ShopStatisticPage = dynamic(() => import("src/components/shop/manage/statistic/ShopStatisticPage"));

const ShopStatistic = (): JSX.Element => {
    return (
        <div>
            <ShopStatisticPage/>
        </div>
    )
}

export default ShopStatistic;

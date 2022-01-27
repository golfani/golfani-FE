import style from './shopRecommendGolfClub.module.css';
import {IGolfClubDto} from "src/apis/GolfClub";
import ShopGolfClubItem from "./ShopGolfClubItem";

const dummyData: Partial<IGolfClubDto>[] = [
    {
        id: 0,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
    {
        id: 1,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
    {
        id: 2,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
    {
        id: 3,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
    {
        id: 4,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
    {
        id: 5,
        brandName: '핑',
        urlList: ['golf_club.webp'],
        name: '에픽 맥스 패스트 드라이버',
        cost: 693000,
    },
]

const ShopRecommendGolfClub = (): JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.recommend_title_txt}>추천상품</span>
            <div className={style.select_box}>
                <button className={style.select_btn_active}>골파니 추천 상품</button>
                <button className={style.select_btn}>인기 상품</button>
            </div>
            <div className={style.item_container}>
                {dummyData.slice(0, 3).map((item) => (
                    <ShopGolfClubItem item={item} key={item.id}/>
                ))}
                <div className={style.item_row_container}>
                    {dummyData.slice(3, 6).map((item) => (
                        <ShopGolfClubItem item={item} key={item.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopRecommendGolfClub;

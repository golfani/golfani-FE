import style from './shopStoreList.module.css';
import ShopStoreItem from "./ShopStoreItem";

export interface IShopStoreDto {
    id : number
    name : string
    location : string
    review : number
}

const dummyData : IShopStoreDto[] = [
    {
        id : 0,
        name : '골프프렌드 수원 송죽점',
        location : '수원시 장안구 조원동 16-9',
        review : 4
    },
    {
        id : 1,
        name : '수원 골프백화점',
        location : '수원시 장안구 조원동 16-9',
        review : 2
    },
    {
        id : 2,
        name : '아일랜드골프 수원 인계점',
        location : '수원시 장안구 조원동 16-9',
        review : 3
    },
    {
        id : 3,
        name : '골마켓 수원 조원점',
        location : '수원시 장안구 조원동 16-9',
        review : 5
    },
]

const ShopStoreList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>검색결과</span>
            <span className={style.store_list_txt}>4개 매장 리스트</span>
            <div className={style.store_item_container}>
            {dummyData.map((store) => (
                <ShopStoreItem key={store.id} store={store}/>
            ))}
            </div>
        </div>
    );
};

export default ShopStoreList;

import style from './shopHotStoreList.module.css';
import {IShopStoreDto} from "./ShopStoreList";
import ShopStoreItem from "./ShopStoreItem";

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

const ShopHotStoreList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.store_list_txt}>🔥금주의 인기 매장</span>
            <div className={style.store_item_container}>
                {dummyData.map((store)=> (
                    <ShopStoreItem store={store} key={store.id}/>
                ))}
            </div>
        </div>
    );
};

export default ShopHotStoreList;

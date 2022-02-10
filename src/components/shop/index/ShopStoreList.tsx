import style from './shopStoreList.module.css';
import ShopStoreItem from "./ShopStoreItem";
import NaverMapInit from "src/components/naver/NaverMapInit";
import {useInfiniteQuery} from "react-query";
import {IShopDto, searchShop} from "src/apis/Shop";
import {IPages} from "src/domain/Page";
import {useEffect, useState} from "react";

interface IShopStoreListProps {
    regCode: number
}

const ShopStoreList = ({regCode}: IShopStoreListProps): JSX.Element => {
    const [nowPage, setNowPage] = useState(1)
    const [page, setPage] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const regSearchShopQuery = useInfiniteQuery<IPages<IShopDto>>(['regSearchShop', regCode], ({pageParam = 0}) => searchShop(regCode, pageParam), {
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.pageable.pageNumber;
            if (currentPage + 1 >= lastPage.totalPages) {
                return undefined;
            }
            return currentPage + 1;
        }
    });

    useEffect(() => {
        if (regSearchShopQuery.data) {
            setPage(regSearchShopQuery.data.pages[0].totalPages);
            setItemCount(regSearchShopQuery.data.pages[0].totalElements);
        }
    }, [regSearchShopQuery.data]);

    const handleClickPage = async (page: number) => {
        await regSearchShopQuery.fetchNextPage();
        setNowPage(page + 1);
    }

    return (
        <div className={style.container}>
            {regSearchShopQuery.data &&
            <NaverMapInit regCode={regCode} shopList={regSearchShopQuery.data?.pages[nowPage - 1].content!}/>}
            <span className={style.title_txt}>검색결과</span>
            <span className={style.store_list_txt}>{`${itemCount}개 매장 리스트`}</span>
            <div className={style.store_item_container}>
                {regSearchShopQuery.data?.pages.map((page, idx) => {
                    if (idx == nowPage - 1) {
                        return (
                            page.content.map((store) => (
                                <ShopStoreItem key={store.id} store={store}/>
                            )))
                    }
                })}
            </div>
            <div className={style.page_box}>
                {[...Array(page)].map((value, idx) => (
                    <span key={idx} className={nowPage === idx + 1 ? style.page_number_active : style.page_number}
                          onClick={() => handleClickPage(idx)}>{idx + 1}</span>
                ))}
            </div>
        </div>
    );
};

export default ShopStoreList;

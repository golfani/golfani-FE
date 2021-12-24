import style from './shopItemReviewList.module.css';
import ShopItemReviewItem from "./ShopItemReviewItem";

const ShopItemReviewList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.review_container}>
                <div className={style.review_box}>
                    <span className={style.total_review_count_txt}>총 23개의 상품평</span>
                    <span className={style.review_txt}>평점 4.2</span>
                </div>
                <span className={style.review_desc_txt}>동일한 모델 대해 작성된 상품평 입니다. 판매한 스토어는 다를 수 있습니다.</span>
            </div>
            <div className={style.sort_box}>
                <span className={style.sort_txt_active}>최신순</span>
                <span className={style.sort_txt}>평점 높은순</span>
                <span className={style.sort_txt}>평점 낮은순</span>
            </div>
            <ShopItemReviewItem/>
            <ShopItemReviewItem/>
            <ShopItemReviewItem/>
            <ShopItemReviewItem/>
            <ShopItemReviewItem/>
            <div className={style.page_box}>
                <span className={style.page_number_active}>1</span>
                <span className={style.page_number}>2</span>
                <span className={style.page_number}>3</span>
                <span className={style.page_number}>4</span>
            </div>
        </div>
    );
};

export default ShopItemReviewList;

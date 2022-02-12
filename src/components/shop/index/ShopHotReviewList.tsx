import style from './shopHotReviewList.module.css';
import ShopHotReviewItem from "./ShopHotReviewItem";

const ShopHotReviewList = (): JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <span className={style.review_list_txt}>유저들의 의견</span>
                <div className={style.select_box}>
                    <button className={style.select_btn_active}>골프채</button>
                    <button className={style.select_btn}>스토어</button>
                    <button className={style.select_btn}>브랜드</button>
                </div>
                <div className={style.review_item_container}>
                    <ShopHotReviewItem/>
                    <ShopHotReviewItem/>
                    <ShopHotReviewItem/>
                </div>
            </div>
        </div>
    );
};

export default ShopHotReviewList;

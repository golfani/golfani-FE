import style from './shopStoreHistory.module.css';

const ShopStoreHistory = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_box}>
                <span className={style.store_txt}>골프프렌드 수원 송죽점</span>
                <button className={style.move_btn}>이동</button>
            </div>
            <div className={style.item_box}>
                <span className={style.store_txt}>수원 골프백화점</span>
                <button className={style.move_btn}>이동</button>
            </div>
            <div className={style.item_box}>
                <span className={style.store_txt}>아일랜드 골프 수원 인계점</span>
                <button className={style.move_btn}>이동</button>
            </div>
            <div className={style.item_box}>
                <span className={style.store_txt}>골마켓 수원 조원점</span>
                <button className={style.move_btn}>이동</button>
            </div>
        </div>
    );
};

export default ShopStoreHistory;

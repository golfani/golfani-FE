import style from './shopNoticeItem.module.css';

const ShopNoticeItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_box}>
                <span className={style.category_txt}>[이벤트]</span>
                <span className={style.content_txt}>골프프렌드 송죽점 골프아니 입점 기념</span>
                <span className={style.date_txt}>2021.12.13</span>
            </div>
        </div>
    );
};

export default ShopNoticeItem;

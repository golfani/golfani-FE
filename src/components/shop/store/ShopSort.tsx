import style from './shopSort.module.css';

const ShopSort = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ul className={style.sort_list_box}>
                <li className={style.active}>최신등록순</li>
                <li>높은가격순</li>
                <li>낮은가격순</li>
                <li>평점높은순</li>
                <li>리뷰많은순</li>
            </ul>
        </div>
    );
};

export default ShopSort;

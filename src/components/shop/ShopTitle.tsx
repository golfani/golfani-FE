import style from './shopTitle.module.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const ShopTitle = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.shop_name_title_txt}>골프프렌드 송죽점</span>
            <div className={style.title_menu_box}>
                <div className={style.bookmark_box}>
                    <BookmarkBorderIcon/>
                    <span className={style.bookmark_txt}>즐겨찾기</span>
                    <span className={style.bookmark_count_txt}>3,120</span>
                </div>
                <div className={style.review_box}>
                    <span className={style.review_txt}>평점</span>
                    <span className={style.review_count_txt}>4.2️</span>
                </div>
            </div>
        </div>
    );
};

export default ShopTitle;

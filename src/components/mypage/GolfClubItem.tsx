import style from './golfClubItem.module.css';
import * as faker from "faker";

const GolfClubItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채이름이 개길</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩150,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채 이름</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩ 1,500,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채 이름ㅇㅁㄴㅇㅁㄴ</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩150,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채 이름</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩150,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채 이름</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩150,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
            <div className={style.item_box}>
                <div className={style.inform_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div>
                        <span className={style.brand_txt}>[ Titleist ]</span>
                        <span className={style.item_name_txt}>골프채 이름</span>
                    </div>
                </div>
                <span className={style.price_txt}>₩150,000</span>
                <span className={style.star_txt}>⭐⭐⭐⭐⭐️</span>
                <span className={style.review_btn}>리뷰</span>
            </div>
        </div>
    );
};

export default GolfClubItem;
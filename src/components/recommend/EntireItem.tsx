import style from './entireItem.module.css';
import * as faker from "faker";

const EntireItem = () : JSX.Element => {
    return (
        <div>
            <div className={style.item_box}>
                <img className={style.img} src={faker.image.avatar()}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.description_txt}>글로벌 스테디셀러 JPX시리즈의 2021년형 신제품</span>
                </div>
                <span className={style.price_txt}>169,000 원</span>
            </div>
            <div className={style.item_box}>
                <img className={style.img} src={faker.image.avatar()}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.description_txt}>글로벌 스테디셀러 JPX시리즈의 2021년형 신제품</span>
                </div>
                <span className={style.price_txt}>169,000 원</span>
            </div>
            <div className={style.item_box}>
                <img className={style.img} src={faker.image.avatar()}/>
                <div className={style.main_box}>
                    <span className={style.category_txt}>아이언</span>
                    <span className={style.brand_txt}>Mizuno</span>
                    <span className={style.name_txt}>JPX900 아이언</span>
                    <span className={style.description_txt}>글로벌 스테디셀러 JPX시리즈의 2021년형 신제품</span>
                </div>
                <span className={style.price_txt}>169,000 원</span>
            </div>
        </div>
    );
};

export default EntireItem;
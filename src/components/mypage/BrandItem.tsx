import style from './brandItem.module.css';
import * as faker from "faker";

const BrandItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_row}>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Titleist</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>테일러메이드</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Callaway</span>
                </div>
            </div>
            <div className={style.item_row}>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Titleist</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>테일러메이드</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Callaway</span>
                </div>
            </div>
            <div className={style.item_row}>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Titleist</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>테일러메이드</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.brand_txt}>Callaway</span>
                </div>
            </div>
        </div>
    );
};

export default BrandItem;
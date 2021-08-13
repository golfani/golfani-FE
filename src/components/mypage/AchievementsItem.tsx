import style from './achievementsItem.module.css';
import * as faker from "faker";

const AchievementsItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_row}>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
            </div>
            <div className={style.item_row}>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
                <div className={style.item_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <span className={style.achievements_txt}>나는야 프로</span>
                </div>
            </div>
        </div>
    );
};

export default AchievementsItem;
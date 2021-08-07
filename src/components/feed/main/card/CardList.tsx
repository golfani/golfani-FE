import style from './cardList.module.css';
import CardItem from "./CardItem";

const CardList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.card_box}>
                <CardItem/>
                <CardItem/>
            </div>
        </div>
    );
};

export default CardList;

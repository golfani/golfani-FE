import style from './cardItem.module.css';
import * as faker from "faker";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const CardItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <img className={style.thumbnail_img} src={faker.image.avatar()}/>
            <div className={style.user_box}>
                <img className={style.user_img} src={faker.image.avatar()}/>
                <span className={style.user_id_txt}>{faker.name.firstName()}</span>
            </div>
            <div className={style.main_box}>
                <span className={style.main_txt}>#골프asdasdasd</span>
                <span className={style.main_txt}>#골프</span>
                <span className={style.main_txt}>#골프</span>
                <span className={style.main_txt}>#골프</span>
            </div>
            <div className={style.icon_box}>
                <div className={style.icon_sub_box}>
                    <FavoriteBorderIcon className={style.icon} color={'error'} fontSize={"small"}/>
                    <span>15</span>
                </div>
                <div className={style.icon_sub_box}>
                    <ChatBubbleOutlineIcon className={style.icon} color={'primary'} fontSize={"small"}/>
                    <span>5</span>
                </div>
            </div>
        </div>
    );
};

export default CardItem;

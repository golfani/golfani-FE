import style from './feedMain.module.css';
import * as faker from "faker";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const FeedMain =() : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.user_box}>
                <img className={style.img} src={faker.image.avatar()}/>
                <div className={style.user_sub_box}>
                    <span className={style.user_id_txt}>{faker.name.firstName()}</span>
                    <span className={style.time_txt}>10시간 전</span>
                </div>
            </div>
            <div className={style.main_txt}>
                <span>오랜만에 필드나오니깐 너무 좋다 ㅎㅎ<br/>코로나 빨리 종식 되길...</span>
            </div>
            <div className={style.tag_box}>
                <span className={style.tag_txt}>#오랜만에필드</span>
                <span className={style.tag_txt}>#골프</span>
                <span className={style.tag_txt}>#GOTD</span>
            </div>
        </div>
    );
};

export default FeedMain;
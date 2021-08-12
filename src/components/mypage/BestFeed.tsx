import style from './bestFeed.module.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as faker from "faker";

const BestFeed = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.feed_row_box}>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
            </div>
            <div className={style.feed_row_box}>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
                <div className={style.feed_box}>
                    <img className={style.img} src={faker.image.avatar()}/>
                    <div className={style.contents_box}>
                        <span className={style.tag_txt}>#명랑골프 #라운딩 #힐드로사이CC</span>
                        <div className={style.like_box}>
                            <FavoriteIcon className={style.like_icon} color={"error"}/>
                        </div>
                        <span className={style.like_txt}>52</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestFeed;
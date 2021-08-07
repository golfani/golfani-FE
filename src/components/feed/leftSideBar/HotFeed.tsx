import style from './hotFeed.module.css';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FeedThumbnail from "./FeedThumbnail";
import faker from 'faker';

export type ThumbnailFeed = {
    id : number,
    img : string
}

const feeds : ThumbnailFeed[] = [
    {id : 1, img : faker.image.avatar()},
    {id : 2, img : faker.image.avatar()},
    {id : 3, img : faker.image.avatar()},
    {id : 4, img : faker.image.avatar()},
    {id : 5, img : faker.image.avatar()},
    {id : 6, img : faker.image.avatar()},
];

const HotFeed = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <WhatshotIcon color={"error"} fontSize={"small"}/>
                <span className={style.title_txt}>인기 피드</span>
                <span className={style.more_txt}>더 보러가기</span>
            </div>
            <FeedThumbnail feeds={feeds}/>
        </div>
    );
};

export default HotFeed;
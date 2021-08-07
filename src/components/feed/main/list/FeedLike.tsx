import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import style from './feedLike.module.css';

const FeedLike = () : JSX.Element => {
    return(
        <div className={style.container}>
            <FavoriteBorderOutlinedIcon fontSize={'small'} color={'error'}/>
            <span>10</span>
        </div>
    );
};

export default FeedLike;
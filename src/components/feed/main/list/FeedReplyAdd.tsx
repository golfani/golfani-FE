import style from './feedReplyAdd.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';

const FeedReplyAdd =() => {
    return(
        <div className={style.container}>
            <GitHubIcon className={style.icon}/>
            <form className={style.form}>
                <input className={style.input} placeholder={"댓글입력"}/>
                <button type={"submit"} className={style.input_btn}>입력</button>
            </form>
        </div>
    );
};

export default FeedReplyAdd;

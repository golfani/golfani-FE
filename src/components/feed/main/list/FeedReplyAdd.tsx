import style from './feedReplyAdd.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import {log} from "util";


interface FeedReplyItemProps {
    onFocus : () => void;
}

const FeedReplyAdd =({onFocus} : FeedReplyItemProps) => {
    return(
        <div className={style.container}>
            <GitHubIcon className={style.icon}/>
            <form className={style.form}>
                <input onFocus={onFocus}  onBlur={()=>console.log("input 나감")} className={style.input} placeholder={"댓글입력"}/>
                <button type={"submit"} className={style.input_btn}>입력</button>
            </form>
        </div>
    );
};

export default FeedReplyAdd;
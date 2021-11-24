import style from './feedAddContent.module.css';
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import {getCookie} from "src/utils/cookieUtil";
import {getProfileImage} from "src/apis/Member";

const FeedAddContent = () : JSX.Element => {
    const feedAdd = useFeedAdd();
    const userId = getCookie('userId');

    return(
        <div className={style.container}>
            <div className={style.user_box}>
                <img className={style.user_img} src={getProfileImage(userId,'MID')}/>
                <span className={style.user_txt}>{userId}</span>
            </div>
            <textarea
                className={style.textarea}
                placeholder='내용 입력...'
                value={feedAdd.feedAddState.content}
                onChange={(e)=>feedAdd.onSetContent(e.target.value)}
            />
        </div>
    );
};

export default FeedAddContent;

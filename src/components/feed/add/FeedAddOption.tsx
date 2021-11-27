import style from './feedAddOption.module.css';
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import FeedAddTag from "./FeedAddTag";

const FeedAddOption = () : JSX.Element => {
    const feedAdd = useFeedAdd();

    return (
        <div className={style.container}>
            <FeedAddTag/>
            <div className={style.option_box}>
                <span className={style.option_title_txt}>설정</span>
                <div className={style.option_sub_box}>
                    <div className={style.option_txt_box}>
                        <span className={style.option_txt}>댓글 기능 해제</span>
                        <span className={style.option_sub_txt}>댓글 작성기능을 해제합니다</span>
                    </div>
                    <label className={style.switch}>
                        <input defaultChecked={!feedAdd.feedAddState.isReplyActive} className={style.option_input} type='checkbox'/>
                        <span onClick={feedAdd.onToggleReplyActive} className={style.slider_round}> </span>
                    </label>
                </div>
                <div className={style.option_sub_box}>
                    <div className={style.option_txt_box}>
                        <span className={style.option_txt}>좋아요 숨기기</span>
                        <span className={style.option_sub_txt}>좋아요 수를 표시하지 않습니다</span>
                    </div>
                    <label className={style.switch}>
                        <input defaultChecked={!feedAdd.feedAddState.isLikesActive} className={style.option_input} type='checkbox'/>
                        <span onClick={feedAdd.onToggleLikesActive} className={style.slider_round}> </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FeedAddOption;

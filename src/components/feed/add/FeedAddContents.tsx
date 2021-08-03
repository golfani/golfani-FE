import style from './feedAddContents.module.css';
import FeedAddTag from "./FeedAddTag";


const FeedAddContents = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.main_txt}>내용 작성하기</span>
                <span className={style.sub_txt}>본문, 태그를 작성해 보세요</span>
            </div>
            <FeedAddTag/>
            <div className={style.contents_box}>
                <textarea className={style.textarea} placeholder="내용을 입력하세요"/>
                <div className={style.option_box}>
                    <span className={style.option_title_txt}>피드 설정</span>
                    <div className={style.option_sub_box}>
                        <span className={style.option_txt}>댓글 기능 해제</span>
                        <label className={style.switch}>
                            <input className={style.option_input} type='checkbox'/>
                            <span className={style.slider_round}></span>
                        </label>
                    </div>
                    <div className={style.option_sub_box}>
                        <span className={style.option_txt}>좋아요 숨기기</span>
                        <label className={style.switch}>
                            <input className={style.option_input} type='checkbox'/>
                            <span className={style.slider_round}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedAddContents;
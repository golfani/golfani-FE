import style from './feedAdd.module.css'
import FeedAddPhoto from "./FeedAddPhoto";
import FeedAddContents from "./FeedAddContents";

const FeedAdd = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div>
                <span className={style.main_txt}>피드 작성하기</span>
                {/*<span className={style.sub_txt}>나만의 피드를 만들어 자랑해 보세요</span>*/}
            </div>
            <div className={style.component_box}>
                {/*<FeedAddPhoto/>*/}
                <FeedAddContents/>
            </div>
            <div className={style.button_box}>
                <button className={style.prev_btn}>이전</button>
                <button className={style.next_btn} type="submit">다음</button>
            </div>
        </div>
    );
};

export default FeedAdd;
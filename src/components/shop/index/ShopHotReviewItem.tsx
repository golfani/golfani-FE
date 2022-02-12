import style from './shopHotReviewItem.module.css'
import {getProfileImage} from "src/apis/Member";

const ShopHotReviewItem = (): JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.user_box}>
                <img className={style.user_img} src={getProfileImage('gudwh14', 'MID')}/>
                <div className={style.user_sub_box}>
                    <span className={style.user_txt}>gudwh14</span>
                    <span className={style.review_star}>⭐⭐⭐⭐⭐️</span>
                </div>
                <span className={style.target_txt}>테스트 골프채 1</span>
            </div>
            <span className={style.review_txt}>색상도 이뿌고 정말 좋네요. 쏙 마음에 듭니다.강추
                사람들이 추천하는 이유가 있네요 정말 관용성이 끝내줍니다 제가 골프 이제 시작한 골린이 인데요 솔직하게 아직 스윙도 제대로 못하지만</span>
            <div className={style.like_box}>
                <span className={style.like_txt}>공감</span>
                <span>12</span>
            </div>
        </div>
    )
}

export default ShopHotReviewItem;

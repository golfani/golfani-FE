import style from './shopItemReviewItem.module.css';
import StarIcon from '@material-ui/icons/Star';

const ShopItemReviewItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div>
                <span className={style.user_txt}>gudwh14</span>
                <span className={style.purchase_store_txt}>구매처 : 골프프렌드 송죽점</span>
            </div>
            <div className={style.review_box}>
                <StarIcon className={style.review_txt} style={{fontSize : 20}}/>
                <StarIcon className={style.review_txt} style={{fontSize : 20}}/>
                <StarIcon className={style.review_txt} style={{fontSize : 20}}/>
                <StarIcon className={style.review_txt} style={{fontSize : 20}}/>
                <StarIcon className={style.review_txt} style={{fontSize : 20}}/>
                <span className={style.date_txt}>2021.12.24</span>
            </div>
            <div className={style.comment_box}>
                <span>색상도 이뿌고 정말 좋네요. 쏙 마음에 듭니다.강추</span>
                <br/>
                <span>사람들이 추천하는 이유가 있네요 정말 관용성이 끝내줍니다 제가 골프 이제 시작한 골린이 인데요 솔직하게 아직 스윙도 제대로 못하지만</span>
            </div>
        </div>
    );
};

export default ShopItemReviewItem;

import style from './shotInfo.module.css';
import MilitaryTechIcon from '@material-ui/icons/MilitaryTech';

const ShopInfo = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.shop_img}></div>
            <span className={style.shop_star}>⭐⭐⭐⭐⭐(5.0)️️️️</span>
            <span className={style.shop_name}>골프프렌즈</span>
            <div className={style.shop}>
                <span className={style.shop_text}>골 프 프 렌 즈</span>
            </div>
            <MilitaryTechIcon className={style.medal_icon} style={{fontSize:'30px'}}/>
            <div className={style.info_wrap}>
                <div className={style.menu_wrap}>
                    <span className={style.boxing}>주소</span>
                    <span className={style.shop_address}>경기도 수원시 경수대로 976-22</span>
                    <button>수정</button>
                </div>
                <div className={style.menu_wrap}>
                    <span className={style.boxing}>연락처</span>
                    <span className={style.shop_address}>010-0000-0000</span>
                    <button>수정</button>
                </div>
                <div className={style.menu_wrap}>
                    <span className={style.boxing}>모든리뷰</span>
                    <span>(15개)</span>
                </div>
                <div className={style.menu_wrap}>
                    <div className={style.medal_wrap}> 싸게사서 비싸게 파는 매장입니다. 여러분들 때문에 제가 벤츠 끌고 다닙니다.</div>
                </div>
            </div>
            <button className={style.modify_btn}>+</button>
        </div>
    )
}

export default ShopInfo;

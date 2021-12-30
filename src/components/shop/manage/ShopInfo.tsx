import style from './shotInfo.module.css';
import MilitaryTechIcon from '@material-ui/icons/MilitaryTech';
import StoreIcon from '@material-ui/icons/Store';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import SellIcon from '@material-ui/icons/Sell';

const ShopInfo = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.shop_img_wrap}>
                <div className={style.shop_img}></div>
                <span className={style.shop_name}>골프프렌즈</span>
                <span className={style.shop_star}>⭐⭐⭐⭐⭐(5.0)️️️️</span>
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
                </div>
            </div>
            <div className={style.shop}>
                <span className={style.shop_text}>골 프 프 렌 즈</span>
                <div style={{display:'flex', alignItems:'center'}}>
                    <CheckIcon style={{fontSize:'12px',color:'red'}}/>
                    <span style={{fontSize:'12px'}}>본인 인증완료</span>
                </div>
                <div className={style.shop_content}>
                    <div>
                        <div className={style.content_wrap}>
                        <PersonIcon style={{fontSize:'12px'}}/>
                        <span className={style.shop_content_txt}>방문자 수</span>
                        <span style={{fontWeight:'bold'}}>100</span>
                        </div>
                        <div className={style.content_wrap}>
                            <StoreIcon style={{fontSize:'12px', color:'blue'}}/>
                            <span className={style.shop_content_txt}>상점오픈일</span>
                            <span style={{fontWeight:'bold'}}> 2022-01-01</span>
                        </div>
                        <div className={style.content_wrap}>
                            <SellIcon style={{fontSize:'12px'}}/>
                            <span className={style.shop_content_txt}>상품판매</span>
                            <span style={{fontWeight:'bold'}}>100회 이상</span>
                        </div>
                    </div>
                    <div className={style.medal_wrap}>
                        싸게사서 비싸게 파는 매장입니다. 여러분들 덕분에 제가 벤츠 끌고 다닙니다.
                    </div>
                </div>
            </div>
            <button className={style.modify_btn}>+</button>
            <MilitaryTechIcon className={style.medal_icon} style={{color:"darkgoldenrod",fontSize:'30px'}}/>
        </div>
    )
}

export default ShopInfo;

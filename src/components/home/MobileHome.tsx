import style from './mobileHome.module.css';
import {useRouter} from "next/router";

const MobileHome = () : JSX.Element => {
    const router = useRouter();

    const onRoutePage = (page : string) => {
        router.push(`/${page}`);
    }

    const handleClickLinkButton = (page : string) => {
        onRoutePage(page);
    }

    return (
        <div className={style.container}>
            <div className={style.rectangle_box} onClick={()=>handleClickLinkButton('shop')}>
                <span className={style.title_txt}>SHOP</span>
                <div className={style.sub_box}>
                    <span className={style.sub_txt}>쇼핑하러 GO!</span>
                    <img src={'icon/shop_ico.png'} className={style.icon}/>
                </div>
            </div>
            <div className={style.square_container}>
                <div className={style.feed_square_box} onClick={()=>handleClickLinkButton('feed')}>
                    <span className={style.title_txt}>피드</span>
                    <div className={style.square_sub_box}>
                        <span className={style.square_sub_txt}>골프 라이프</span>
                        <span className={style.square_sub_txt}>공유해 보세요!</span>
                    </div>
                    <img src={'icon/feed_ico.png'} className={style.icon}/>
                </div>
                <div className={style.community_square_box} onClick={()=>handleClickLinkButton('board')}>
                    <span className={style.title_txt}>커뮤니티</span>
                    <div className={style.square_sub_box}>
                        <span className={style.square_sub_txt}>골프 이야기</span>
                        <span className={style.square_sub_txt}>나누어 보세요!</span>
                    </div>
                    <img src={'icon/community_ico.png'} className={style.icon}/>
                </div>
            </div>
        </div>
    );
};

export default MobileHome;

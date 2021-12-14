import style from './shopFooter.module.css';

const ShopFooter = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>판매자 정보</span>
            <div className={style.info_box}>
                <span className={style.info_title_txt}>상호명</span>
                <span className={style.info_txt}>골프프렌드 송죽점</span>
            </div>
            <div className={style.info_box}>
                <span className={style.info_title_txt}>판매자</span>
                <span className={style.info_txt}>차형조</span>
            </div>
            <div className={style.info_box}>
                <span className={style.info_title_txt}>사업자등록번호</span>
                <span className={style.info_txt}>12345678910</span>
            </div>
            <div className={style.info_box}>
                <span className={style.info_title_txt}>소재지</span>
                <span className={style.info_txt}>경기도 수원시 장안구 송죽동 91-5</span>
            </div>
            <div className={style.info_box}>
                <span className={style.info_title_txt}>연락처</span>
                <span className={style.info_txt}>010-1234-5678</span>
            </div>
        </div>
    );
};

export default ShopFooter;

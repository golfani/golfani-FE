import style from './shopItemHistory.module.css';

const ShopItemHistory = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_box}>
                <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                <button className={style.move_btn}>이동</button>
            </div>
            <div className={style.item_box}>
                <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                <button className={style.move_btn}>이동</button>
            </div>
            <div className={style.item_box}>
                <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                <button className={style.move_btn}>이동</button>
            </div>
        </div>
    );
};

export default ShopItemHistory;

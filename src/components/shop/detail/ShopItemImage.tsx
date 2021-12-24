import style from './shopItemImage.module.css';

const ShopItemImage = () : JSX.Element => {
    return (
        <div className={style.container}>
            <img className={style.main_img} src={'/golf_club.webp'}/>
            <div className={style.img_box}>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
                <img className={style.sub_img} src={'/golf_club.webp'}/>
            </div>
        </div>
    );
};

export default ShopItemImage;

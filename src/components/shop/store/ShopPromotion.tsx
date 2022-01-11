import style from './shopPromotion.module.css';
import Slider from "react-slick";

const ShopPromotion = () : JSX.Element => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false,
        autoplay : true,
        autoplaySpeed : 3000,
    };

    return (
        <div className={style.container}>
            <Slider {...settings}>
                <img src={'/golfShop_promotion0.jpeg'} alt={'promotion'}/>
                <img src={'/golfShop_promotion0.jpeg'} alt={'promotion'}/>
            </Slider>
        </div>
    );
};

export default ShopPromotion;
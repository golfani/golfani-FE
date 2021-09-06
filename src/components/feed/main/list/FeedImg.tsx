import style from './feedImg.module.css';
import * as faker from "faker";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CustomNextArrow = ({className, style, onClick} : any) : JSX.Element=> {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position : 'absolute', right : 10}}
            onClick={onClick}
        />
    )
}

const CustomPrevArrow = ({className, style, onClick} : any) : JSX.Element=> {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position : 'absolute', left : 10, zIndex : 10}}
            onClick={onClick}
        />
    )
}

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow : <CustomNextArrow/>,
    prevArrow : <CustomPrevArrow/>
};

const FeedImg = () : JSX.Element => {
    return (
        <div className={style.container}>
            <Slider {...settings}>
                <div>
                    <img className={style.img} src={faker.image.avatar()}/>
                </div>
                <div>
                    <img className={style.img} src={faker.image.avatar()}/>
                </div>
                <div>
                    <img className={style.img} src={faker.image.avatar()}/>
                </div>
            </Slider>
        </div>
    );
};

export default FeedImg;

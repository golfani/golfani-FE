import style from './shopNoticeList.module.css';
import ShopNoticeItem from "./ShopNoticeItem";
import Slider from "react-slick";

const ShopNoticeList = () : JSX.Element => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows : false,
        autoplay : true,
        autoplaySpeed : 3500
    };

    return (
        <div className={style.container}>
            <span className={style.title_txt}>공지사항</span>
            <Slider {...settings}>
                <ShopNoticeItem/>
                <ShopNoticeItem/>
                <ShopNoticeItem/>
                <ShopNoticeItem/>
                <ShopNoticeItem/>
            </Slider>
        </div>
    );
};

export default ShopNoticeList;

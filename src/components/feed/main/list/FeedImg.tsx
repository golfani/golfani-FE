import style from './feedImg.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {IFeedProps} from "src/domain/Feed";
import {useQuery} from "react-query";
import {getFeedPicture, getPictureFile, IPictureDto, PICTURE_API_URL} from "src/apis/Picture";
import Image from 'next/image';

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
    prevArrow : <CustomPrevArrow/>,
};

const FeedImg = ({feed} : IFeedProps) : JSX.Element => {
    const imageQuery = useQuery<IPictureDto[]>(['feedImg',feed.id],()=>getFeedPicture(feed.id), {
        staleTime : 1000 * 60 * 10
    })

    return (
        <div className={style.container}>
            <Slider {...settings}>
                {imageQuery.data?.map((image)=> (
                    <div key={image.id}>
                        <Image className={style.img} src={getPictureFile(image.path,image.filename) as any} width={600} height={550}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeedImg;

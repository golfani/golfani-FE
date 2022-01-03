import style from './feedImg.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useMutation, useQueryClient} from "react-query";
import {registerLikes} from "src/apis/Likes";
import {useCallback, useEffect, useState} from "react";
import FeedLikeToastModal from "src/components/modals/feed/FeedLikeToastModal";
import {sendAlarmBySocket} from "src/apis/Alarm";
import {IFeedItemProps} from "./FeedItem";
import {isMobile} from "src/utils/detectDevice";

export const CustomNextArrow = ({className, style, onClick} : any) : JSX.Element=> {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position : 'absolute', right : 10}}
            onClick={onClick}
        />
    )
}

export const CustomPrevArrow = ({className, style, onClick} : any) : JSX.Element=> {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position : 'absolute', left : 10, zIndex : 10}}
            onClick={onClick}
        />
    )
}

const FeedImg = ({feed, isModal} : IFeedItemProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const [toastModalOpen, setToastModalOpen] = useState(false);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow : <CustomNextArrow/>,
        prevArrow : <CustomPrevArrow/>,
        arrows : !isMobile()
    };

    const likeMutation = useMutation(()=> registerLikes("FEED",feed.id));

    const onRegisterLikes = useCallback( async ()=> {
        const isLike = queryClient.getQueryData(['isFeedLikes',feed.id]);
        if(!isLike) {
            try {
                const response = await likeMutation.mutateAsync();
                sendAlarmBySocket('LIKES',feed.userId,'피드를 좋아합니다.',feed.id,null,'FEED');
                await onToastMessage();
            } catch (e) {
                console.log(e)
            } finally {
                await queryClient.invalidateQueries(['feedLikes', feed.id]);
                await queryClient.invalidateQueries(['isFeedLikes', feed.id]);
            }
        }
    },[likeMutation])

    const onToastMessage = () => {
        setToastModalOpen((toastModalOpen)=> true)
        setTimeout(()=> {
            setToastModalOpen((toastModalOpen)=> false);
        },2300)
    }

    const handleDoubleClick = async () => {
        await onRegisterLikes();
    }

    return (
        <div className={isModal ? style.modal_container : style.container}>
            <Slider {...settings}>
                {feed.urlList.map((image,index)=> {
                    if(index % 3 === 0) {
                        return (
                            <div key={index}>
                                <img id='feed_img' alt={image} className={style.img} src={image} onDoubleClick={handleDoubleClick}/>
                            </div>
                        )
                    }
                })}
            </Slider>
            {toastModalOpen ? <FeedLikeToastModal refUserId={feed.userId}/> : <></>}
        </div>
    );
};

export default FeedImg;

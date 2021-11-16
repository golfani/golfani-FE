import style from './feedImg.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useMutation, useQueryClient} from "react-query";
import {registerLikes} from "src/apis/Likes";
import {useCallback, useState} from "react";
import ToastModal from "src/components/modals/ToastModal";
import {sendAlarmBySocket} from "src/apis/Alarm";
import {IFeedItemProps} from "./FeedItem";

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

const FeedImg = ({feed, isModal} : IFeedItemProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const [toastModalOpen, setToastModalOpen] = useState(false);

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
        <div className={isModal ? style.modal_container : style.container} onDoubleClick={handleDoubleClick}>
            <Slider {...settings}>
                {feed.urlList.map((image,index)=> {
                    if(index % 3 === 0) {
                        return (
                            <div key={index}>
                                <img className={style.img} src={image}/>
                            </div>
                        )
                    }
                })}
            </Slider>
            {toastModalOpen ? <ToastModal refUserId={feed.userId}/> : <></>}
        </div>
    );
};

export default FeedImg;

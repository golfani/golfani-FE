import style from './feedImg.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {IFeedProps} from "src/domain/Feed";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getFeedPicture, getPictureFile, IPictureDto, PICTURE_API_URL} from "src/apis/Picture";
import Image from 'next/image';
import {registerLikes} from "src/apis/Likes";
import {useCallback, useState} from "react";
import ToastModal from "src/components/modals/ToastModal";

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
    const queryClient = useQueryClient();
    const imageQuery = useQuery<IPictureDto[]>(['feedImg',feed.id],()=>getFeedPicture(feed.id), {
        staleTime : 1000 * 60 * 10
    });
    const [toastModalOpen, setToastModalOpen] = useState(false);

    const likeMutation = useMutation(()=> registerLikes("FEED",feed.id,"gudwh14"));

    const onRegisterLikes = useCallback( async ()=> {
        const isLike = queryClient.getQueryData(['isFeedLikes',feed.id]);
        if(!isLike) {
            try {
                const response = await likeMutation.mutateAsync();
            } catch (e) {
                console.log(e)
            } finally {
                await queryClient.invalidateQueries(['feedLikes', feed.id]);
                await queryClient.invalidateQueries(['isFeedLikes', feed.id]);
                await onToastMessage();
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
        <div className={style.container} onDoubleClick={handleDoubleClick}>
            <Slider {...settings}>
                {imageQuery.data?.map((image)=> (
                    <div key={image.id}>
                        <Image className={style.img} src={getPictureFile(image.path,image.filename) as any} width={600} height={550}/>
                    </div>
                ))}
            </Slider>
            {toastModalOpen ? <ToastModal refUserId={feed.userId}/> : <></>}
        </div>
    );
};

export default FeedImg;

import style from './feedAddImage.module.css';
import {ChangeEvent, useRef} from "react";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import {IImg} from "src/store/modules/feedAdd/feedAdd";
import {dataURLtoFile} from "src/utils/fileUtil";
import {CustomNextArrow, CustomPrevArrow} from "../main/list/FeedImg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow : <CustomNextArrow/>,
    prevArrow : <CustomPrevArrow/>,
};

const FeedAddImage = () : JSX.Element => {
    const feedAdd = useFeedAdd();
    const sliderRef = useRef<Slider>(null);

    const onChangeImage = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if(!input.files?.length) { // 파일이 들어오지 않았을때 종료
            return;
        }
        if(feedAdd.feedAddState.imgList.length + input.files.length > 6) {
            alert("최대 6장 업로드 가능합니다.");
            return;
        }

        for(let i = 0; i < input.files.length; i ++) {
            const file: File = input.files[i]; // file 추출하기
            const fileUrl = URL.createObjectURL(file); // file 로 URL 만들기
            let canvas = window.document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let canvasImage = new Image();
            canvasImage.src = fileUrl;
            const maxWidth = 1080;
            const maxHeight = 1080;

            canvasImage.onload = () => {
                let width = canvasImage.width;
                let height = canvasImage.height;
                if (width > height) {
                    if (width > maxWidth) {
                        height = height * maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = width * maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(canvasImage, 0, 0, width, height);
                const resizeImageUrl = canvas.toDataURL('image/jpeg', 0.75);
                const resizeImageFile = dataURLtoFile(resizeImageUrl, file.name);
                const img: IImg = {
                    imgFile: dataURLtoFile(resizeImageUrl, file.name),
                    imgFileUrl: URL.createObjectURL(resizeImageFile)
                }
                feedAdd.onAddImg(img);
                sliderRef.current?.slickGoTo(feedAdd.feedAddState.imgList.length);
            }
        }
    }

    const handleClickDeleteImg = (index : number) => {
        feedAdd.onDeleteImg(index);
    }

    return (
        <div className={style.container}>
            {feedAdd.feedAddState.imgList.length
                ?
                <div className={style.on_img_add_box}>
                    <Slider {...settings} ref={sliderRef}>
                        {feedAdd.feedAddState.imgList.map((img,index) => (
                            <div className={style.img_box} key={index}>
                                <img src={img.imgFileUrl} alt={img.imgFileUrl} className={style.on_img}/>
                                <button className={style.img_delete_btn} onClick={()=>handleClickDeleteImg(index)}>X</button>
                            </div>
                        ))}
                    </Slider>
                    <div className={style.img_more_add_box}>
                        <label htmlFor='img_more_input' className={style.img_more_add_btn}>이미지 추가</label>
                        <input id='img_more_input' className={style.hidden} type='file' accept='image/jpeg' onChange={onChangeImage}/>
                    </div>
                </div>
                :
                <div className={style.no_img_add_box}>
                    <label htmlFor='no_img_input' className={style.no_img_icon}/>
                    <input id='no_img_input' type='file' accept='image/jpeg' className={style.hidden} onChange={onChangeImage} multiple={true}/>
                    <label htmlFor='no_img_input' className={style.no_img_txt}>파일 업로드</label>
                </div>
            }
        </div>
    );
};

export default FeedAddImage;

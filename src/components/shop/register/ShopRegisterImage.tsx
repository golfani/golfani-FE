import {ChangeEvent, useRef} from "react";
import Slider from "react-slick";
import {CustomNextArrow, CustomPrevArrow} from "src/components/feed/main/list/FeedImg";
import {dataURLtoFile} from "src/utils/fileUtil";
import style from './shopRegisterImage.module.css';
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";
import {IShopRegisterImg} from "src/store/modules/shopRegister/shopRegister";
import {isMobile} from "src/utils/detectDevice";

const ShopRegisterImage = () : JSX.Element => {
    const shopRegister = useShopRegister();
    const sliderRef = useRef<Slider>(null);
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

    const onChangeImage = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if(!input.files?.length) { // 파일이 들어오지 않았을때 종료
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
                const resizeImageDataUrl = canvas.toDataURL('image/jpeg', 0.75);
                const resizeImageFile = dataURLtoFile(resizeImageDataUrl, file.name);
                const resizeImageUrl = URL.createObjectURL(resizeImageFile);
                const img : IShopRegisterImg = {
                    imgFiles : resizeImageFile,
                    imgUrls : resizeImageUrl
                }
                shopRegister.onAddImg(img);
                sliderRef.current?.slickGoTo(shopRegister.img.length);
            }
        }
    }

    const handleClickDeleteImg = (index : number) => {
        shopRegister.onDeleteImg(index);
    }

    return (
        <div className={style.container}>
            {shopRegister.img.length
                ?
                <div className={style.on_img_add_box}>
                    <Slider {...settings} ref={sliderRef}>
                        {shopRegister.img.map((img,index) => (
                            <div className={style.img_box} key={index}>
                                <img src={img.imgUrls} alt={img.imgUrls} className={style.on_img}/>
                                <button className={style.img_delete_btn} onClick={()=>handleClickDeleteImg(index)}>X</button>
                            </div>
                        ))}
                    </Slider>
                    {/*<div className={style.img_more_add_box}>*/}
                    {/*    <label htmlFor='img_more_input' className={style.img_more_add_btn}>이미지 추가</label>*/}
                    {/*    <input id='img_more_input' className={style.hidden} type='file' accept='image/jpeg' onChange={onChangeImage}/>*/}
                    {/*</div>*/}
                </div>
                :
                <label htmlFor='no_img_input' className={style.no_img_add_box}>
                    <img src={'/icon/image_ico.png'} alt={'image'} className={style.no_img_icon}/>
                    <input id='no_img_input' type='file' accept='image/jpeg' className={style.hidden} onChange={onChangeImage}/>
                    <label htmlFor='no_img_input' className={style.no_img_txt}>스토어 대표사진 등록</label>
                </label>
            }
        </div>
    );
};

export default ShopRegisterImage;

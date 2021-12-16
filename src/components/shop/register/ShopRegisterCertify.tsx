import style from './shopRegisterCertify.module.css';
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";
import {ChangeEvent} from "react";
import {dataURLtoFile} from "src/utils/fileUtil";
import {IShopRegisterImg} from "src/store/modules/shopRegister/shopRegister";

const ShopRegisterCertify = () : JSX.Element => {
    const shopRegister = useShopRegister();

    const onChangeImage = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if(!input.files?.length) { // 파일이 들어오지 않았을때 종료
            return;
        }
        const file : File = input.files[0]; // file 추출하기
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
            if(width> height) {
                if(width > maxWidth) {
                    height = height * maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if(height > maxHeight) {
                    width = width * maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(canvasImage, 0 ,0, width, height);
            const resizeImageDataUrl = canvas.toDataURL('image/webp', 0.75);
            const resizeImageFile = dataURLtoFile(resizeImageDataUrl,file.name);
            const resizeImageUrl = URL.createObjectURL(resizeImageFile);
            const img : IShopRegisterImg = {
                imgFiles : resizeImageFile,
                imgUrls : resizeImageUrl
            }
            shopRegister.onAddCertifyImg(img);
        }
    }

    const handleClickDeleteImg = () => {
        shopRegister.onDeleteCertifyImg(0);
    }

    return (
        <div className={style.container}>
            {shopRegister.certifyImg.length ?
                <div className={style.img_box}>
                    <img className={style.on_img} src={shopRegister.certifyImg[0].imgUrls} alt={'certifyImg'}/>
                    <button className={style.img_delete_btn} onClick={handleClickDeleteImg}>X</button>
                </div>
                :
                <div className={style.no_img_add_box}>
                    <label htmlFor={'img'} className={style.no_img_icon}/>
                    <input id={'img'} className={style.hidden} type={'file'} accept={'image/jpeg'} onChange={onChangeImage}/>
                    <span className={style.no_img_txt}>사업자등록증 등록</span>
                </div>
            }
        </div>
    );
};

export default ShopRegisterCertify;

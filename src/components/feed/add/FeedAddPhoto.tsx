import style from './feedAddPhoto.module.css'
import {ChangeEvent, useState} from "react";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import {IImg} from "src/store/modules/feedAdd/feedAdd";
import {dataURLtoFile} from "src/utils/fileUtil";

const FeedAddPhoto = () : JSX.Element => {
    const [imgFile, setImgFile] = useState<Array<File>>([]);
    const [imgFileUrl, setImgFileUrl] = useState<Array<string>>([]);
    const {feedAddState,onAddImg,onDeleteImg} = useFeedAdd();


    const onChangeImage = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if(!input.files?.length) { // 파일이 들어오지 않았을때 종료
            return;
        }
        if(feedAddState.imgList.length>=6) {
            alert("최대 6장 업로드 가능합니다.")
            return;
        }
        const file : File = input.files[0]; // file 추출하기
        const fileUrl = URL.createObjectURL(file); // file 로 URL 만들기
        let canvas = window.document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let canvasImage = new Image();
        canvasImage.src = fileUrl;
        const maxWidth = 1280;
        const maxHeight = 1280;

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
            const resizeImageUrl = canvas.toDataURL(file.type, 0.75);
            const img : IImg = {
                imgFile : dataURLtoFile(resizeImageUrl,file.name),
                imgFileUrl : resizeImageUrl
            }
            onAddImg(img);
        }
    }

    const handleClickImage = (id : number) => {
        onDeleteImg(id);
    }

    const renderInputImg = feedAddState.imgList.map((img,index)=> {
        return (
            <div key={img.imgFileUrl} className={style.img_sub_box}>
                <img src={img.imgFileUrl} className={style.img} onClick={()=>handleClickImage(index)}/>
            </div>
        )
    })

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.main_txt}>사진 넣기</span>
                <span className={style.sub_txt}>최대 6장 까지 사진을 넣을 수 있습니다</span>
            </div>
            <div className={style.main_box}>
                <label className={style.addPhoto_btn} htmlFor="input" >사진 추가</label>
                <input onChange={onChangeImage} id="input" type="file" accept="image/jpeg, image/png" className={style.hidden}/>
                <div className={style.img_box}>
                    {renderInputImg}
                </div>
            </div>
        </div>
    );
};

export default FeedAddPhoto;

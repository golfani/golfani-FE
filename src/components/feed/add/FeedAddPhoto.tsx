import style from './feedAddPhoto.module.css'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {ChangeEvent, useState} from "react";

const FeedAddPhoto = () : JSX.Element => {
    const [imgFile, setImgFile] = useState<Array<File>>([]);
    const [imgFileUrl, setImgFileUrl] = useState<Array<string>>([]);

    const onChangeImage = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if(!input.files?.length) { // 파일이 들어오지 않았을때 종료
            return;
        }
        if(imgFile.length>=6) {
            return;
        }
        const file : File = input.files[0]; // file 추출하기
        const fileUrl = URL.createObjectURL(file); // file 로 URL 만들기

        setImgFile(imgFile.concat(file));
        setImgFileUrl(imgFileUrl.concat(fileUrl));
    }

    const renderInputImg = imgFileUrl.map((imgUrl,index)=> {
        return (
            <div key={imgUrl} className={style.img_sub_box}>
                <img src={imgUrl} className={style.img}/>
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
import style from './brandAdd.module.css';
import {ChangeEvent, useState} from "react";
import {dataURLtoFile} from "src/utils/fileUtil";
import {IBrandDto, registerBrand} from "src/apis/Brand";

interface IBrandAddProps {
    setOpenBrandAdd : (state : boolean) => void;
}

const BrandAdd = ({setOpenBrandAdd} : IBrandAddProps) : JSX.Element => {
    const [imgFile, setImgFile] = useState<File>();
    const [imgFileUrl, setImgFileUrl] = useState<string>();
    const [brandName, setBrandName] = useState('');
    const [brandDesc, setBrandDesc] = useState('');

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
        const maxWidth = 600;
        const maxHeight = 600;

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
            const imgFile = dataURLtoFile(resizeImageUrl,file.name);
            setImgFile(imgFile);
            setImgFileUrl(resizeImageUrl);
        }
    }

    const onInitState = () => {
        setImgFile(undefined);
        setImgFileUrl(undefined);
        setBrandDesc('');
        setBrandName('');
    }

    const onRegisterBrand = async () => {
        try {
            const brandDto : Partial<IBrandDto> = {
                brandName : brandName,
                brandDescription : brandDesc
            }
            const response = await registerBrand(brandDto,imgFile!);
            alert('등록되었습니다.');
            onInitState();
        }
        catch (e) {
            alert(e);
        }
    }

    const handleClickRegister = async () => {
        if(imgFile && brandName && brandDesc) {
            await onRegisterBrand();
        }
        else {
            alert('데이터를 입력해주세요!');
        }
    }

    const handleClickCloseButton = () => {
        setOpenBrandAdd(false);
    }

    return (
        <div className={style.container}>
            <span className={style.title_txt}>브랜드 추가</span>
            <div>
                <div className={style.input_box}>
                    <span className={style.input_title_txt}>브랜드 로고</span>
                    {imgFileUrl
                        ? <img src={imgFileUrl} className={style.logo_img}/>
                        : <label htmlFor='img' className={style.logo_input}>로고</label>
                    }
                    <input id='img' type="file" accept="image/jpeg, image/png" className={style.hidden} onChange={onChangeImage}/>
                </div>
                <div className={style.input_box}>
                    <span className={style.input_title_txt}>브랜드 명</span>
                    <input className={style.input} value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
                </div>
                <div className={style.input_box}>
                    <span className={style.input_title_txt}>브랜드 소개</span>
                    <textarea className={style.textarea} value={brandDesc} onChange={(e)=>setBrandDesc(e.target.value)}/>
                </div>
                <button className={style.register_btn} onClick={handleClickRegister}>등록</button>
                <button className={style.close_btn} onClick={handleClickCloseButton}>닫기</button>
            </div>
        </div>
    );
};

export default BrandAdd;

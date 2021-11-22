import style from './golfClubAdd.module.css';
import {ChangeEvent, useState} from "react";
import {IGolfClubDto, registerGolfClub, TGolfClub} from "src/apis/GolfClub";
import {dataURLtoFile} from "src/utils/fileUtil";

interface IGolfClubProps {
    setOpenGolfClubAdd : (state : boolean) => void
    brandId : number
}

const GolfClubAdd = ({setOpenGolfClubAdd, brandId} : IGolfClubProps) : JSX.Element => {
    const initialState : Partial<IGolfClubDto> = {
        clubType : 'PUTTER',
        name : '',
        description : '',
        cost : 0,
        year : 0,
        shaft : 0,
        face : 0,
        sound : 0,
        shooting : 0,
        gender : '',
    };
    const [inputs, setInput] = useState<Partial<IGolfClubDto>>(initialState);
    const {clubType, name, description, gender, cost, year, shaft, face, sound, shooting} = inputs;
    const [imgFiles, setImgFiles] = useState<File[]>([]);
    const [imgUrls, setImgUrls] = useState<string[]>([]);

    const handleClickGolfClubType = (type : TGolfClub) => {
        setInput({...inputs, clubType : type});
    }

    const handleChangeInputs = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name ,value} = e.target
        setInput({...inputs, [name] : value});
    }

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
            const resizeImageUrl = canvas.toDataURL('image/webp', 0.75);
            const imgFile = dataURLtoFile(resizeImageUrl,file.name);
            setImgFiles(imgFiles.concat(imgFile));
            setImgUrls(imgUrls.concat(resizeImageUrl));
        }
    }

    const onRegisterGolfClub = async () => {
        try {
            const golfClubDto : Partial<IGolfClubDto> = {
                brandId : brandId,
                clubType : clubType,
                name : name,
                description : description,
                year : Number(year),
                gender : gender,
                face : Number(face),
                shaft : Number(shaft),
                sound : Number(sound),
                shooting : Number(shooting),
                cost : Number(cost)
            }
            const response = await registerGolfClub(golfClubDto,imgFiles);
            alert('장비 등록완료');
            setInput(initialState);
        }
        catch (e) {
            alert('입력값들을 다시 한번 확인해 주세요');
        }
    }

    const handleClickRegisterButton = async () => {
        await onRegisterGolfClub();
    }

    const handleClickCancelButton = () => {
        setOpenGolfClubAdd(false);
    }

    return (
        <div className={style.container}>
            <div className={style.input_box}>
                <span className={style.input_title_txt}>타입</span>
                <ul className={style.golfClub_type_list_box}>
                    <li className={clubType === 'PUTTER' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('PUTTER')}>PUTTER
                    </li>
                    <li className={clubType === 'DRIVER' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('DRIVER')}>DRIVER
                    </li>
                    <li className={clubType === 'WOOD' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('WOOD')}>WOOD
                    </li>
                    <li className={clubType === 'IRON' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('IRON')}>IRON
                    </li>
                    <li className={clubType === 'WEDGE' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('WEDGE')}>WEDGE
                    </li>
                    <li className={clubType === 'UTIL' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('UTIL')}>UTIL
                    </li>
                </ul>
            </div>
            <div className={style.golfClub_name_box}>
                <div className={style.input_box}>
                    <span className={style.input_title_txt}>장비 이름</span>
                    <input className={style.input} name='name' value={name} onChange={handleChangeInputs}/>
                </div>
                <div className={style.input_box}>
                    <span className={style.input_title_txt}>장비 설명</span>
                    <textarea className={style.textarea} name='description' value={description} onChange={handleChangeInputs}/>
                </div>
            </div>
            <div className={style.input_box}>
                <span className={style.input_title_txt}>장비 이미지</span>
                <div className={style.img_input_box}>
                    <div className={style.img_box}>
                        {imgUrls.map((url,index) => (
                            <img src={url} key={index} className={style.img}/>
                        ))}
                    </div>
                    <label htmlFor='img' className={style.input_img}>이미지 추가</label>
                    <input className={style.hidden} id='img' type='file' accept="image/jpeg, image/png" onChange={onChangeImage}/>
                </div>
            </div>
            <div className={style.input_box}>
                <span className={style.input_title_txt}>상세정보</span>
                <div className={style.sub_input_container}>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>출시년도</span>
                        <input className={style.sub_input} type='number' name='year' value={year} onChange={handleChangeInputs}/>
                        <span>년</span>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>가격</span>
                        <input className={style.sub_input} type='number' name='cost' value={cost} onChange={handleChangeInputs}/>
                        <span>원</span>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>성별</span>
                        <input className={style.radio_input} type='radio' name='gender' value='MALE' onChange={handleChangeInputs}/>
                        <span className={style.radio_txt}>남성</span>
                        <input className={style.radio_input} type='radio' name='gender' value='FEMALE' onChange={handleChangeInputs}/>
                        <span className={style.radio_txt}>여성</span>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>face</span>
                        <input className={style.sub_input} type='number' name='face' value={face} onChange={handleChangeInputs}/>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>shaft</span>
                        <input className={style.sub_input} type='number' name='shaft' value={shaft} onChange={handleChangeInputs}/>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>sound</span>
                        <input className={style.sub_input} type='number' name='sound' value={sound} onChange={handleChangeInputs}/>
                    </div>
                    <div className={style.sub_input_box}>
                        <span className={style.sub_input_txt}>shooting</span>
                        <input className={style.sub_input} type='number' name='shooting' value={shooting} onChange={handleChangeInputs}/>
                    </div>
                </div>
            </div>
            <div className={style.button_box}>
                <button className={style.golfClub_cancel_btn} onClick={handleClickCancelButton}>취소</button>
                <button className={style.golfClub_register_btn} onClick={handleClickRegisterButton}>등록</button>
            </div>
        </div>
    );
};

export default GolfClubAdd;

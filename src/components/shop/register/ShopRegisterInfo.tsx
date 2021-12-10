import style from './shopRegisterInfo.module.css';
import DaumPostcode from "react-daum-postcode";
import {CSSProperties, useState} from "react";

const daumPostStyle : CSSProperties = {width : '400px', height : '500px'}

const ShopRegisterInfo = () : JSX.Element => {
    const [openPost, setOpenPost] = useState(false);
    const [address, setAddress] = useState(false);

    const handleClickFindPost = () => {
        setOpenPost(true);
    }

    const handleDaumPostClose = (data : any) => {
        setOpenPost(false);
        setAddress(data.address);
    }

    return (
        <div className={style.container}>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 명</span>
                <input className={style.input}/>
                <span className={style.description_txt}>*실제 스토어페이지에서 보여질 이름입니다</span>
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 상세설명</span>
                <textarea className={style.textarea}/>
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 주소</span>
                <div className={style.address_box}>
                    <span className={style.address_txt}>{address}</span>
                    <button className={style.find_btn} onClick={handleClickFindPost}>찾기</button>
                </div>
                <input placeholder={'상세주소'} className={style.input}/>
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 연락처</span>
                <div>
                    <input className={style.contact_input} type={'number'}/>
                    <span className={style.contact_dash}>-</span>
                    <input className={style.contact_input} type={'number'}/>
                    <span className={style.contact_dash}>-</span>
                    <input className={style.contact_input} type={'number'}/>
                </div>
            </div>
            {openPost &&
            <div className={style.daum_box}>
                <DaumPostcode onComplete={handleDaumPostClose} style={daumPostStyle}/>
            </div>
            }
        </div>
    );
};

export default ShopRegisterInfo;

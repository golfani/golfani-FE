import style from './shopRegisterModal.module.css';
import ShopRegisterInfo from "src/components/shop/register/ShopRegisterInfo";
import ShopRegisterImage from "src/components/shop/register/ShopRegisterImage";
import {useState} from "react";

const ShopRegisterModal = () : JSX.Element => {
    const [inputs, setInputs] = useState();
    const [imgFiles, setImgFiles] = useState<File[]>([]);
    const [imgUrls, setImgUrls] = useState<string[]>([]);

    return (
        <div className={style.container}>
            <div className={style.modal_box}>
                <div className={style.title_box}>
                    <button className={style.prev_btn}>취소</button>
                    <span className={style.title_txt}>스토어 등록</span>
                    <button className={style.next_btn}>다음</button>
                </div>
                <div className={style.content_box}>
                    <ShopRegisterInfo/>
                    {/*<ShopRegisterImage imgFiles={imgFiles} setImgFiles={setImgFiles} imgUrls={imgUrls} setImgUrls={setImgUrls}/>*/}
                </div>
            </div>
        </div>
    );
};

export default ShopRegisterModal;

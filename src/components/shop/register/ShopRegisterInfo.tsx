import style from './shopRegisterInfo.module.css';
import DaumPostcode from "react-daum-postcode";
import {ChangeEvent, CSSProperties, useState} from "react";
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";
import ShopRegNumCertifyModal from "src/components/modals/shop/ShopRegNumCertifyModal";

const daumPostStyle : CSSProperties = {width : '400px', height : '500px'}

const ShopRegisterInfo = () : JSX.Element => {
    const shopRegister = useShopRegister();
    const [openPost, setOpenPost] = useState(false);
    const [openRegNumCertifyModal, setOpenRegNumCertifyModal] = useState(false);

    const handleClickCertify = () => {
        setOpenRegNumCertifyModal(true);
    }

    const handleClickFindPost = () => {
        setOpenPost(true);
    }

    const handleDaumPostClose = (data : any) => {
        setOpenPost(false);
        shopRegister.onSetAddress(data.address);
        shopRegister.onSetSubAddress('');
    }

    const handleChangeSubAddress = (e : ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        shopRegister.onSetSubAddress(value);
    }

    return (
        <div className={style.container}>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 명</span>
                <input
                    className={style.input}
                    value={shopRegister.shopName}
                    onChange={(e) => shopRegister.onSetShopName(e.target.value)}
                />
                <span className={style.description_txt}>*실제 스토어페이지에서 보여질 이름입니다</span>
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 상세설명</span>
                <textarea
                    className={style.textarea}
                    value={shopRegister.description}
                    onChange={(e)=> shopRegister.onSetDescription(e.target.value)}
                />
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>사업자 등록번호</span>
                <div className={style.registrationNumber_box}>
                    <span className={style.registrationNumber_txt}>{shopRegister.registrationNumber}</span>
                    <button className={style.find_btn} onClick={handleClickCertify}>등록</button>
                </div>
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 주소</span>
                <div className={style.address_box}>
                    <span className={style.address_txt}>{shopRegister.address}</span>
                    <button className={style.find_btn} onClick={handleClickFindPost}>찾기</button>
                </div>
                <input
                    placeholder={'상세주소'}
                    className={style.input}
                    value={shopRegister.subAddress}
                    onChange={handleChangeSubAddress}
                    disabled={!shopRegister.address}
                />
            </div>
            <div className={style.input_box}>
                <span className={style.input_txt}>스토어 연락처</span>
                <div>
                    <input
                        className={style.contact_input}
                        type={'number'}
                        value={shopRegister.contactFirst}
                        onChange={(e) => shopRegister.onSetContactFirst(e.target.value)}
                    />
                    <span className={style.contact_dash}>-</span>
                    <input
                        className={style.contact_input}
                        type={'number'}
                        value={shopRegister.contactMiddle}
                        onChange={(e) => shopRegister.onSetContactMiddle(e.target.value)}
                    />
                    <span className={style.contact_dash}>-</span>
                    <input
                        className={style.contact_input}
                        type={'number'}
                        value={shopRegister.contactLast}
                        onChange={(e) => shopRegister.onSetContactLast(e.target.value)}
                    />
                </div>
            </div>
            {openPost &&
            <div className={style.daum_box}>
                <DaumPostcode onComplete={handleDaumPostClose} style={daumPostStyle}/>
            </div>
            }
            {openRegNumCertifyModal && <ShopRegNumCertifyModal setModalOpen={setOpenRegNumCertifyModal}/>}
        </div>
    );
};

export default ShopRegisterInfo;
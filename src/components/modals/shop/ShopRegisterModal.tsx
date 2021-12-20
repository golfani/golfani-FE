import style from './shopRegisterModal.module.css';
import ShopRegisterInfo from "src/components/shop/register/ShopRegisterInfo";
import ShopRegisterImage from "src/components/shop/register/ShopRegisterImage";
import {useEffect, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import Modal from "../Modal";
import {SHOP_REGISTER_STATUS} from "src/domain/Shop";
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";
import ShopRegisterCertify from "src/components/shop/register/ShopRegisterCertify";

interface IShopRegisterModalProps {
    setModalOpen : (state : boolean) => void
}

const ShopRegisterModal = (props : IShopRegisterModalProps) : JSX.Element => {
    const shopRegister = useShopRegister();
    const modalRef = useRef<HTMLDivElement>(null)
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [titleMsg, setTitleMsg] = useState('스토어 등록');

    const onCloseModal = () => {
        props.setModalOpen(false);
    }

    const onMessageModalShow = () => {
        setMessageModalOpen(true);
    }

    const handleClickPrevButton = () => {
        switch (shopRegister.step) {
            case SHOP_REGISTER_STATUS.INFO:
                onMessageModalShow();
                break;
            case SHOP_REGISTER_STATUS.IMAGE:
                shopRegister.onSetStep(SHOP_REGISTER_STATUS.INFO);
                break
            case SHOP_REGISTER_STATUS.CERTIFY:
                shopRegister.onSetStep(SHOP_REGISTER_STATUS.IMAGE);
                break;
        }
    }

    const handleClickNextButton = () => {
        switch (shopRegister.step) {
            case SHOP_REGISTER_STATUS.INFO:
                shopRegister.checkValidInputs() ? shopRegister.onSetStep(SHOP_REGISTER_STATUS.IMAGE) : alert('정보를 입력해 주세요');
                break;
            case SHOP_REGISTER_STATUS.IMAGE:
                shopRegister.img.length ? shopRegister.onSetStep(SHOP_REGISTER_STATUS.CERTIFY) : alert('대표사진을 등록해 주세요');
                break;
        }
    }

    const fetchRegisterShop = async () => {
        //todo
    }

    handleClickRefOutSide(modalRef,onMessageModalShow);

    useEffect(() => {
        return () => shopRegister.onInitState();
    },[]);

    useEffect(() => {
        switch (shopRegister.step) {
            case SHOP_REGISTER_STATUS.INFO:
                setTitleMsg('스토어 정보입력');
                break;
            case SHOP_REGISTER_STATUS.IMAGE:
                setTitleMsg('스토어 대표사진 등록');
                break;
            case SHOP_REGISTER_STATUS.CERTIFY:
                setTitleMsg('사업자등록증 등록');
                break;
        }
    },[shopRegister.step])

    return (
        <div className={style.container}>
            <div className={style.modal_box} ref={modalRef}>
                <div className={style.title_box}>
                    <button
                        className={style.prev_btn}
                        onClick={handleClickPrevButton}>
                        {shopRegister.step === SHOP_REGISTER_STATUS.INFO ? '취소' : '뒤로'}
                    </button>
                    <span className={style.title_txt}>{titleMsg}</span>
                    <button
                        className={style.next_btn}
                        onClick={handleClickNextButton}>
                        {shopRegister.step === SHOP_REGISTER_STATUS.CERTIFY ? '등록' : '다음'}
                    </button>
                </div>
                <div className={style.content_box}>
                    {shopRegister.step === SHOP_REGISTER_STATUS.INFO && <ShopRegisterInfo/>}
                    {shopRegister.step === SHOP_REGISTER_STATUS.IMAGE && <ShopRegisterImage/>}
                    {shopRegister.step === SHOP_REGISTER_STATUS.CERTIFY && <ShopRegisterCertify/>}
                </div>
                {messageModalOpen && <Modal message={'스토어 등록을 취소하시겠습니까?'} setModalOpen={setMessageModalOpen} successCallback={onCloseModal}/>}
            </div>
        </div>
    );
};

export default ShopRegisterModal;
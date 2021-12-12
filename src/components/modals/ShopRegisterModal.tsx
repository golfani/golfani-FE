import style from './shopRegisterModal.module.css';
import ShopRegisterInfo from "src/components/shop/register/ShopRegisterInfo";
import ShopRegisterImage from "src/components/shop/register/ShopRegisterImage";
import {useEffect, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import Modal from "./Modal";
import {SHOP_REGISTER_STATUS} from "src/domain/Shop";
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";

interface IShopRegisterModalProps {
    setModalOpen : (state : boolean) => void
}

const ShopRegisterModal = (props : IShopRegisterModalProps) : JSX.Element => {
    const shopRegister = useShopRegister();
    const modalRef = useRef<HTMLDivElement>(null)
    const [messageModalOpen, setMessageModalOpen] = useState(false);

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
                break;
        }
    }

    const handleClickNextButton = () => {
        switch (shopRegister.step) {
            case SHOP_REGISTER_STATUS.INFO:
                shopRegister.checkValidInputs() ? shopRegister.onSetStep(SHOP_REGISTER_STATUS.IMAGE) : alert('정보를 입력해 주세요');
                break;
            case SHOP_REGISTER_STATUS.IMAGE:

        }
    }

    const fetchRegisterShop = async () => {
        //todo
    }

    handleClickRefOutSide(modalRef,onMessageModalShow);

    useEffect(() => {
        return () => shopRegister.onInitState();
    },[]);

    return (
        <div className={style.container}>
            <div className={style.modal_box} ref={modalRef}>
                <div className={style.title_box}>
                    <button
                        className={style.prev_btn}
                        onClick={handleClickPrevButton}>
                        {shopRegister.step === SHOP_REGISTER_STATUS.INFO ? '취소' : '뒤로'}
                    </button>
                    <span className={style.title_txt}>스토어 등록</span>
                    <button
                        className={style.next_btn}
                        onClick={handleClickNextButton}>
                        {shopRegister.step === SHOP_REGISTER_STATUS.IMAGE ? '등록' : '다음'}
                    </button>
                </div>
                <div className={style.content_box}>
                    {shopRegister.step === SHOP_REGISTER_STATUS.INFO && <ShopRegisterInfo/>}
                    {shopRegister.step === SHOP_REGISTER_STATUS.IMAGE &&
                    <ShopRegisterImage/>
                    }
                </div>
                {messageModalOpen && <Modal message={'스토어 등록을 취소하시겠습니까?'} setModalOpen={setMessageModalOpen} successCallback={onCloseModal}/>}
            </div>
        </div>
    );
};

export default ShopRegisterModal;

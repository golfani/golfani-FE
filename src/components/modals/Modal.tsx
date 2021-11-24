import style from './modal.module.css';

export interface IModalProps {
    message : String
    setModalOpen : (state : boolean) => void
    successCallback : () => void
}

const Modal = (props : IModalProps) => {

    const onModalClose = () => {
        props.setModalOpen(false);
    }

    const handleClickCancelButton = () => {
        onModalClose();
    }

    const handleClickOkButton = () => {
        props.successCallback();
    }

    return (
        <div className={style.modal}>
            <div className={style.modal_box}>
                <div className={style.msg_box}>
                    <span className={style.msg_txt}>{props.message}</span>
                </div>
                <div className={style.button_box}>
                    <button className={style.cancel_btn} onClick={handleClickCancelButton}>취소</button>
                    <button className={style.ok_btn} onClick={handleClickOkButton}>확인</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

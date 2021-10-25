import style from './modal.module.css';

export interface IModalProps {
    message : String
    setModalOpen : (state : boolean) => void
}

const Modal = (props : IModalProps) => {
    const onModalClose = () => {
        props.setModalOpen(false);
    }

    return (
        <div className={style.modal}>
            <div className={style.modal_box}>
                <div className={style.msg_box}>
                    <span>{props.message}</span>
                </div>
                <div className={style.button_box}>
                    <button className={style.ok_btn} onClick={onModalClose}>확인</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

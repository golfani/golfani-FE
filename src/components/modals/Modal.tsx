import style from './modal.module.css';

export interface IModalProps {
    open : boolean
    message : String
    onSubmit : () => void
}

const Modal = (props : IModalProps) => {
    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <div className={style.modal_box}>
                <div className={style.msg_box}>
                    <span>{props.message}</span>
                </div>
                <div className={style.button_box}>
                    <button className={style.ok_btn} onClick={props.onSubmit}>확인</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

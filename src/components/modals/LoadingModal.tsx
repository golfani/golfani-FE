import style from './loadingModal.module.css';

interface ILoadingModalProps  {
    open : boolean
}

const LoadingModal = (props : ILoadingModalProps) : JSX.Element => {
    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <span className={style.loading}></span>
        </div>
    );
};

export default LoadingModal;

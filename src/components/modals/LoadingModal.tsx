import style from './loadingModal.module.css';

interface ILoadingModalProps  {
}

const LoadingModal = (props : ILoadingModalProps) : JSX.Element => {
    return (
        <div className={style.modal}>
            <span className={style.loading}></span>
        </div>
    );
};

export default LoadingModal;

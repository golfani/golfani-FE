import style from './toastModal.module.css';
import FavoriteIcon from "@material-ui/icons/Favorite";

interface IToastModalProps {
    refUserId : string
}

const ToastModal = (props : IToastModalProps) : JSX.Element => {
    return (
        <div className={style.modal_open}>
            <FavoriteIcon fontSize={'small'} className={style.heart_icon}/>
            <span className={style.msg_txt}>{`${props.refUserId}님 피드에`}</span>
            <span className={style.action_txt}>&nbsp;"좋아요"&nbsp;</span>
            <span className={style.msg_txt}> 를 눌렀습니다.</span>
        </div>
    );
};

export default ToastModal;

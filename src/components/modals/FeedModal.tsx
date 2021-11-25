import {IFeedContent} from "src/apis/Feed";
import FeedItem from "../feed/main/list/FeedItem";
import style from './feedModal.module.css';
import {useRef, useState} from "react";
import {handleClickRefOutSide, handleModalSwipeEvent} from "src/utils/clickUtil";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {bodyScrollActionForModal} from "src/utils/scrollUtil";

export interface IFeedModalProps {
    feed: IFeedContent
    setModalOpen: (state: boolean) => void
}

const FeedModal = (props : IFeedModalProps) : JSX.Element => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobileClose, setIsMobileClose] = useState(false);
    const [slideDiff, setSlideDiff] = useState<number>();

    const onModalClose = () => {
        props.setModalOpen(false);
    }

    const onCloseModalByMobile = () => {
        setIsMobileClose(true);
        setTimeout(()=> {
            onModalClose();
        },100)
    }

    const handleClickBackIcon = () => {
        onCloseModalByMobile();
    }

    bodyScrollActionForModal();
    handleClickRefOutSide(targetRef,onModalClose);
    handleModalSwipeEvent(onModalClose,setSlideDiff);

    return (
        <div className={isMobileClose ? style.modal_close : style.modal} style={{left : slideDiff}}>
            <div className={style.feedModal_box} ref={targetRef}>
                <div className={style.header}>
                    <ArrowBackIosNewIcon onClick={handleClickBackIcon} className={style.back_icon}/>
                    <span className={style.title_txt}>상세보기</span>
                </div>
                <FeedItem feed={props.feed} isModal={true}/>
            </div>
        </div>
    );
};

export default FeedModal;

import {IFeedContent} from "src/apis/Feed";
import FeedItem from "../feed/main/list/FeedItem";
import style from './feedModal.module.css';
import {useEffect, useRef} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {bodyScrollActionForModal} from "../../utils/scrollUtil";

export interface IFeedModalProps {
    feed: IFeedContent
    setModalOpen: (state: boolean) => void
}


const FeedModal = (props : IFeedModalProps) : JSX.Element => {
    const targetRef = useRef<HTMLDivElement>(null);

    const onModalClose = () => {
        props.setModalOpen(false);
    }

    bodyScrollActionForModal();
    handleClickRefOutSide(targetRef,onModalClose);

    return (
        <div className={style.modal}>
            <div className={style.feedModal_box} ref={targetRef}>
                <div className={style.header}>
                    <ArrowBackIosNewIcon onClick={onModalClose} className={style.back_icon}/>
                    <span className={style.title_txt}>상세보기</span>
                </div>
                <FeedItem feed={props.feed} isModal={true}/>
            </div>
        </div>
    );
};

export default FeedModal;

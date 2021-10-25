import {IFeedContent} from "src/apis/Feed";
import FeedItem from "../feed/main/list/FeedItem";
import style from './feedModal.module.css';
import {useRef} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";

export interface IFeedModalProps {
    feed: IFeedContent
    setModalOpen: (state: boolean) => void
}


const FeedModal = (props : IFeedModalProps) : JSX.Element => {
    const targetRef = useRef<HTMLDivElement>(null);

    const onModalClose = () => {
        props.setModalOpen(false);
    }

    handleClickRefOutSide(targetRef,onModalClose);

    return (
        <div className={style.modal}>
            <div ref={targetRef}>
                <FeedItem feed={props.feed} isModal={true}/>
            </div>
        </div>
    );
};

export default FeedModal;

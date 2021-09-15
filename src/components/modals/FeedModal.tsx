import {IFeedContent} from "src/apis/Feed";
import FeedItem from "../feed/main/list/FeedItem";
import style from './feedModal.module.css';
import {useRef} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";

export interface IFeedModalProps {
    open: boolean
    feed: IFeedContent
    setOpen: (state: boolean) => void
}


const FeedModal = (props : IFeedModalProps) : JSX.Element => {
    const targetRef = useRef<HTMLDivElement>(null);

    const onModalClose = () => {
        props.setOpen(false);
    }

    handleClickRefOutSide(targetRef,onModalClose);

    return (
        <div className={props.open ? style.modal_open : style.modal_close} >
            <div ref={targetRef}>
                <FeedItem feed={props.feed} isModal={true}/>
            </div>
        </div>
    );
};

export default FeedModal;

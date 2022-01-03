import style from './feedAddModal.module.css';
import FeedAddImage from "src/components/feed/add/FeedAddImage";
import {useEffect, useRef, useState} from "react";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import FeedAddContent from "src/components/feed/add/FeedAddContent";
import FeedAddOption from "src/components/feed/add/FeedAddOption";
import Modal from "../Modal";
import {registerFeed} from "src/apis/Feed";
import {useQueryClient} from "react-query";
import useFeedZIndex from "src/store/modules/feedZIndex/feedZIndexHook";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {bodyScrollActionForModal} from "src/utils/scrollUtil";
import {isMobile} from "src/utils/detectDevice";

const FEED_ADD_STATUS = {
    IMAGE : '사진 업로드',
    CONTENT : '본문 작성하기',
    OPTION : '설정하기'
} as const

type FEED_ADD_STATUS = typeof FEED_ADD_STATUS[keyof typeof FEED_ADD_STATUS];

interface IFeedAddModalProps {
    setModalOpen : (state : boolean) => void
}

const FeedAddModal = ({setModalOpen} : IFeedAddModalProps) : JSX.Element => {
    const [step, setStep] = useState<FEED_ADD_STATUS>(FEED_ADD_STATUS.IMAGE);
    const feedAdd = useFeedAdd();
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const feedZIndex = useFeedZIndex();
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMobileClose, setIsMobileClose] = useState(false);

    const handleClickPrevButton = () => {
        switch (step) {
            case FEED_ADD_STATUS.IMAGE:
                onCancelFeedAdd();
                break;
            case FEED_ADD_STATUS.CONTENT:
                setStep(FEED_ADD_STATUS.IMAGE);
                break;
            case FEED_ADD_STATUS.OPTION:
                setStep(FEED_ADD_STATUS.CONTENT);
                break;
        }
    }

    const handleClickNextButton = async () => {
        switch (step) {
            case FEED_ADD_STATUS.IMAGE:
                feedAdd.feedAddState.imgList.length && setStep(FEED_ADD_STATUS.CONTENT);
                break;
            case FEED_ADD_STATUS.CONTENT:
                setStep(FEED_ADD_STATUS.OPTION);
                break;
            case FEED_ADD_STATUS.OPTION:
                await onRegisterFeed();
                break;
        }
    }

    const onRegisterFeed = async () => {
        try {
            const response = await registerFeed(feedAdd.feedAddState);
            onCloseModal();
            await queryClient.invalidateQueries('feed');
        }
        catch (e) {

        }
    }

    const onCloseModal = () => {
        setModalOpen(false);
    }

    const onCancelFeedAdd = () => {
        if(isMobile()) {
            onMobileClose();
        }
        else {
            setMessageModalOpen(true);
        }
    }

    const modalSuccessCallback = () => {
        onCloseModal();
    }

    const onMobileClose = () => {
        setIsMobileClose(true);
        setTimeout(()=> {
            onCloseModal();
        }, 300)
    }

    useEffect(()=> {
        feedZIndex.onSetBelow();
        feedAdd.onInit();
    },[])

    handleClickRefOutSide(modalRef,onCancelFeedAdd);
    bodyScrollActionForModal();

    return (
        <div className={isMobileClose ? style.container_close :style.container}>
            <div className={style.modal_box} ref={modalRef}>
                <div className={style.title_box}>
                    <button className={style.title_prev_btn} onClick={handleClickPrevButton}>{step === FEED_ADD_STATUS.IMAGE ? '취소' : '이전'}</button>
                    <span className={style.title_txt}>{step}</span>
                    {feedAdd.feedAddState.imgList.length
                        ?
                        <button className={style.title_next_btn} onClick={handleClickNextButton}>{step === FEED_ADD_STATUS.OPTION ? '완료' : '다음'}</button>
                        :
                        null
                    }
                </div>
                <div className={style.content_box}>
                    {step === FEED_ADD_STATUS.IMAGE && <FeedAddImage/>}
                    {step === FEED_ADD_STATUS.CONTENT && <FeedAddContent/>}
                    {step === FEED_ADD_STATUS.OPTION && <FeedAddOption/>}
                </div>
                {messageModalOpen && <Modal message={'피드 작성을 취소하겠습니까?'} setModalOpen={setMessageModalOpen} successCallback={modalSuccessCallback}/>}
            </div>
        </div>
    );
};

export default FeedAddModal;

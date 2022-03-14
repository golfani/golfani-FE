import style from './feedModifyModal.module.css';
import {IFeedContent, modifyFeed} from "src/apis/Feed";
import {useCallback, useEffect, useRef, useState} from "react";
import {useMutation, useQueryClient} from "react-query";

interface IFeedModifyModalProps {
    feed: IFeedContent
    setModalOpen: (state: boolean) => void
    closeMenuModal: () => void
}

const FeedModifyModal = (props: IFeedModifyModalProps): JSX.Element => {
    const [content, setContent] = useState(props.feed.content);
    const [isReplyActive, setIsReplyActive] = useState(props.feed.isReplyActive);
    const [isLikesActive, setIsLikesActive] = useState(props.feed.isLikesActive);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const queryClient = useQueryClient();
    const feedMutate = useMutation((feed: IFeedContent) => modifyFeed(feed));

    const onCloseModal = async () => {
        await props.setModalOpen(false);
        await props.closeMenuModal();
    }

    const handleChangeReplyOption = () => {
        setIsReplyActive((isReplyActive) => !isReplyActive);
    }

    const handleChangeLikesOption = () => {
        setIsLikesActive((isLikesActive) => !isLikesActive);
    }

    const onModifyFeed = useCallback(async () => {
        try {
            const newFeed: IFeedContent = {
                ...props.feed,
                content: content,
                isLikesActive: isLikesActive,
                isReplyActive: isReplyActive
            };
            await feedMutate.mutateAsync(newFeed);
        } catch (e) {

        } finally {
            await queryClient.invalidateQueries('feed');
            await queryClient.invalidateQueries(['userFeed', props.feed.userId]);
            await queryClient.invalidateQueries(['recentFeed', props.feed.userId]);
            await onCloseModal();
        }
    }, [feedMutate]);

    useEffect(() => {
        textAreaRef.current?.focus();
        textAreaRef.current?.setSelectionRange(props.feed.content.length, props.feed.content.length);
    }, []);

    const handleClickCloseButton = () => {
        onCloseModal();
    }

    const handleClickModifyButton = async () => {
        await onModifyFeed();
    }

    return (
        <div className={style.modal}>
            <div className={style.modal_box}>
                <div className={style.title_box}>
                    <span className={style.title_btn} onClick={handleClickCloseButton}>취소</span>
                    <span className={style.title_txt}>피드수정</span>
                    <span className={style.title_btn} onClick={handleClickModifyButton}>완료</span>
                </div>
                <img src={props.feed.urlList[0]} alt={props.feed.urlList[0]} width={300} height={300}
                     className={style.img}/>
                <textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={style.textArea}
                />
                <span className={style.tag}>{props.feed.tag}</span>
                <div className={style.option_box}>
                    <div className={style.option_sub_box}>
                        <div className={style.option_txt_box}>
                            <span className={style.option_txt}>댓글 기능 해제</span>
                            <span className={style.option_sub_txt}>댓글 작성기능을 해제합니다</span>
                        </div>
                        <label className={style.switch}>
                            <input defaultChecked={!isReplyActive} className={style.option_input} type='checkbox'/>
                            <span onClick={handleChangeReplyOption} className={style.slider_round}> </span>
                        </label>
                    </div>
                    <div className={style.option_sub_box}>
                        <div className={style.option_txt_box}>
                            <span className={style.option_txt}>좋아요 숨기기</span>
                            <span className={style.option_sub_txt}>좋아요 수를 표시하지 않습니다</span>
                        </div>
                        <label className={style.switch}>
                            <input defaultChecked={!isLikesActive} className={style.option_input} type='checkbox'/>
                            <span onClick={handleChangeLikesOption} className={style.slider_round}> </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedModifyModal;

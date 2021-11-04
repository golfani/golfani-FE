import style from './feedModifyModal.module.css';
import {IFeedContent, modifyFeed} from "src/apis/Feed";
import {useEffect, useRef, useState} from "react";
import {useMutation, useQueryClient} from "react-query";

interface IFeedModifyModalProps {
    feed : IFeedContent
    setModalOpen : (state :boolean) => void
    closeMenuModal : () => void
 }

const FeedModifyModal = (props : IFeedModifyModalProps) : JSX.Element => {
    const [content, setContent] = useState(props.feed.content);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const queryClient = useQueryClient();
    const feedMutate = useMutation((feed : IFeedContent)=>modifyFeed(feed));

    const onCloseModal = async () => {
        await props.setModalOpen(false);
        await props.closeMenuModal();
    }

    const onModifyFeed = async () => {
        try {
            const newFeed = {...props.feed, content : content};
            const response = await feedMutate.mutateAsync(newFeed);
        }
        catch (e) {

        }
        finally {
            await queryClient.invalidateQueries('feed');
            await onCloseModal();
        }
    }

    useEffect(()=> {
        textAreaRef.current?.focus();
        textAreaRef.current?.setSelectionRange(props.feed.content.length,props.feed.content.length);
    },[]);

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
                <img src={props.feed.urlList[0]} width={300} height={300} className={style.img}/>
                <textarea
                    ref={textAreaRef}
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    className={style.textArea}
                />
                <span className={style.tag}>{props.feed.tag}</span>
                <div className={style.button_box}>
                    <button className={style.button} onClick={handleClickCloseButton}>취소</button>
                    <button className={style.button} onClick={handleClickModifyButton}>완료</button>
                </div>
            </div>
        </div>
    );
};

export default FeedModifyModal;

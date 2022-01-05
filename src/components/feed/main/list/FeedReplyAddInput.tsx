import style from "./feedReplyAddInput.module.css";
import {useMutation, useQueryClient} from "react-query";
import {ChangeEvent, useCallback, useRef, useState} from "react";
import {registerReply} from "src/apis/Reply";
import {IFeedReplyAddProps} from "src/domain/Reply";
import {sendAlarmBySocket} from "src/apis/Alarm";
import {sendFCM} from "src/apis/FirebaseCloudMessage";

const FeedReplyAddInput = ({feedId,feedUser, refId, refUser} : IFeedReplyAddProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(()=> registerReply("FEED",feedId,replyPayload));
    const replyMutation = useMutation(()=>registerReply("FEED_REPLY",feedId,replyPayload,refId,refUser));
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onRegisterReply = useCallback(async () => {
        try {
            const response = await replyMutation.mutateAsync();
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['feedReply', feedId]);
            await queryClient.invalidateQueries(['reply', refId]);
            await queryClient.invalidateQueries(['totalReply', refId]);
            try {
                sendAlarmBySocket('REPLY', refUser!, '댓글에 답글을 남겼습니다. ', feedId, replyPayload, 'FEED_REPLY', refId!);
                await sendFCM(`댓글에 답글을 남겼습니다. "${replyPayload}"`, refUser!);
            } catch (e) {

            }
        }
    }, [replyMutation]);

    const onRegisterComment = useCallback(async () => {
        try {
            const response = await commentMutation.mutateAsync();
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['feedReply', feedId]);
            try {
                sendAlarmBySocket('REPLY', feedUser!, '피드에 댓글을 남겼습니다. ', feedId, replyPayload, 'FEED');
                await sendFCM(`피드에 답글을 남겼습니다. "${replyPayload}"`, feedUser!);
            } catch (e) {

            }
        }
    }, [commentMutation]);

    const handleSubmit = async () => {
        refId ? await onRegisterReply() : await onRegisterComment();
    }

    const handleResizeHeight = () => {
        if(textAreaRef.current) {
            textAreaRef.current.style.height = '35px';
            textAreaRef.current.style.height = textAreaRef.current?.scrollHeight + "px";
        }
    }

    const handleChangeTextArea = (event : ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setReplyPayload(input.value);
        handleResizeHeight();
    }

    const handleTextAreaKeyPress = async (event : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter' && replyPayload.replace(/\s/g, '').length) {
            if(!event.shiftKey) {
                event.preventDefault();
                await handleSubmit();
            }
        }
        else if(event.key === 'Enter') {
            if(!event.shiftKey) {
                event.preventDefault();
            }
        }
    }

    return (
        <div className={style.form}>
            <textarea value={replyPayload} onChange={handleChangeTextArea} onKeyPress={handleTextAreaKeyPress} className={style.input} placeholder={"댓글을 달아보세요!"} ref={textAreaRef}/>
        </div>
    );
};

export default FeedReplyAddInput;

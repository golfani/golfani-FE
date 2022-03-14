import {IPostReplyAddProps} from "src/domain/Reply";
import {useMutation, useQueryClient} from "react-query";
import {ChangeEvent, useCallback, useEffect, useState, memo} from "react";
import {registerReply} from "src/apis/Reply";
import style from "src/components/board/comment/boardReplyInputAdd.module.css";
import {sendAlarmBySocket} from "src/apis/Alarm";
import {sendFCM} from "src/apis/FirebaseCloudMessage";

const BoardReplyInputAdd = ({postId, postUser, refId, refUser, anonymous}: IPostReplyAddProps) => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(() => registerReply("POST", postId, replyPayload));
    const replyMutation = useMutation(() => registerReply("POST_REPLY", postId, replyPayload, refId, refUser));

    const onRegisterComment = useCallback(async () => {
        try {
            await commentMutation.mutateAsync();
            try {
                sendAlarmBySocket('REPLY', postUser!, "게시글에 댓글을 남겼습니다.", postId, replyPayload, 'POST');
                await sendFCM(`게시글에 댓글을 남겼습니다. "${replyPayload}"`, postUser!, false, anonymous);
            } catch (e) {

            }
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['postReply', postId]);
            await queryClient.invalidateQueries(['board', String(postId)]);
            await queryClient.invalidateQueries(['postAllReply', postId]);
        }
    }, [commentMutation]);

    const onRegisterReply = useCallback(async () => {
        try {
            await replyMutation.mutateAsync();
            try {
                sendAlarmBySocket('REPLY', refUser!, "댓글에 답글을 남겼습니다.", postId, replyPayload, 'POST_REPLY', refId!);
                await sendFCM(`댓글에 답글을 남겼습니다. "${replyPayload}"`, refUser!, false, anonymous);
            } catch (e) {

            }
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['replyQuery', refId]);
            await queryClient.invalidateQueries(['board', String(postId)]);
            await queryClient.invalidateQueries(['postAllReply', postId]);
        }
    }, [replyMutation]);

    const handleSubmit = async () => {
        refId ? await onRegisterReply() : await onRegisterComment();
    }

    const handleChangeTextArea = (event: ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setReplyPayload(input.value);
    }

    const disableButton = (): boolean => {
        return !replyPayload.replace(/\s/g, '').length
    }

    return (
        <div>
            <div className={style.form}>
                <textarea
                    value={replyPayload}
                    onChange={handleChangeTextArea}
                    className={style.input}
                    placeholder={"댓글을 달아보세요!"}
                />
                <button disabled={disableButton()} className={style.input_btn} onClick={handleSubmit}>등록</button>
            </div>
        </div>
    )
}

export default memo(BoardReplyInputAdd);

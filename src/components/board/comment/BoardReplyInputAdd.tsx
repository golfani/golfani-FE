import {IPostReplyAddProps} from "src/domain/Reply";
import {useMutation, useQueryClient} from "react-query";
import {ChangeEvent, KeyboardEventHandler, useCallback, useState} from "react";
import {registerReply} from "src/apis/Reply";
import style from "src/components/board/comment/boardReplyInputAdd.module.css";
import {sendAlarmBySocket} from "src/apis/Alarm";

const BoardReplyInputAdd = ({postId, postUser, refId, refUser} : IPostReplyAddProps) => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(() => registerReply("POST", postId, replyPayload));
    const replyMutation = useMutation(() => registerReply("POST_REPLY", postId, replyPayload, refId, refUser));

    const onRegisterComment = useCallback(async () => {
        try {
            const response = await commentMutation.mutateAsync();
            postUser && sendAlarmBySocket('REPLY', postUser, "게시글에 댓글을 남겼습니다.", postId, replyPayload, 'POST');
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['postReply', postId]);
            await queryClient.invalidateQueries(['board', String(postId)]);
        }
    }, [commentMutation])

    const onRegisterReply = useCallback(async () => {
        try {
            const response = await replyMutation.mutateAsync();
        } catch (e) {
            console.log(e);
        } finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['replyQuery', refId]);
            await queryClient.invalidateQueries(['board', String(postId)]);
        }
    }, [replyMutation])

    const handleSubmit = async () => {
        refId ? await onRegisterReply() : await onRegisterComment();
    }

    const handleChangeTextArea = (event: ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setReplyPayload(input.value);
    }

    const disableButton = () : boolean => {
        return !replyPayload.replace(/\s/g, '').length
    }

    return(
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

export default BoardReplyInputAdd;

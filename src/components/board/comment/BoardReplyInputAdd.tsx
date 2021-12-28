import {IPostReplyAddProps} from "src/domain/Reply";
import {useMutation, useQueryClient} from "react-query";
import {ChangeEvent, KeyboardEventHandler, useCallback, useRef, useState} from "react";
import {registerReply} from "src/apis/Reply";
import style from "src/components/board/comment/boardReplyInputAdd.module.css";
import {sendAlarmBySocket} from "src/apis/Alarm";

const BoardReplyInputAdd = ({postId, postUser, refId, refUser} : IPostReplyAddProps) => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(()=> registerReply("POST", postId,replyPayload));
    const replyMutation = useMutation(()=>registerReply("POST_REPLY",postId,replyPayload,refId as number,refUser as string));
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onRegisterComment = useCallback(async ()=> {
        try {
            const response = await commentMutation.mutateAsync();
            postUser && sendAlarmBySocket('REPLY', postUser, "게시글에 댓글을 남겼습니다.", postId, replyPayload, 'POST');
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['postReply',postId]);
            await queryClient.invalidateQueries(['getTotalReplies',postId]);
        }
    },[commentMutation])

    const onRegisterReply = useCallback( async ()=>{
        try{
            const response = await replyMutation.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally{
            setReplyPayload("");
            await queryClient.invalidateQueries(['replyQuery',refId]);
            await queryClient.invalidateQueries(['getTotalReplies', postId]);
            await queryClient.invalidateQueries(['totalReply', refId]);
        }
    },[[replyMutation]])

    const handleSubmit = async () => {
        refId ? await onRegisterReply() : await onRegisterComment();
    }

    const handleChangeTextArea = (event : ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setReplyPayload(input.value);
    }

    const handleOnPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key == 'Enter' && !e.shiftKey)
        {
            handleSubmit();
        }
    }

    return(
        <div>
            <div className={style.form}>
                <textarea value={replyPayload} onChange={handleChangeTextArea} className={style.input} onKeyPress={handleOnPress} placeholder={"댓글을 달아보세요!"} ref={textAreaRef}/>
                <button className={style.input_btn} onClick={handleSubmit}>등록</button>
            </div>
        </div>
    )
}

export default BoardReplyInputAdd;

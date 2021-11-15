import {IPostReplyAddProps} from "src/domain/Reply";
import {useMutation, useQueryClient} from "react-query";
import {ChangeEvent, useCallback, useRef, useState} from "react";
import {registerReply} from "src/apis/Reply";
import style from "src/components/board/main/comment/boardReplyInputAdd.module.css";

const BoardReplyInputAdd = ({postId, postUser, refId, refUser} : IPostReplyAddProps) => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(()=> registerReply("POST", postId,replyPayload));
    const replyMutation = useMutation(()=>registerReply("POST_REPLY",postId,replyPayload,refId,refUser ));
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onRegisterComment = useCallback(async ()=> {
        try {
            const response = await commentMutation.mutateAsync();
            console.log(response);
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
            console.log(response);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['replyQuery',refId]);
            await queryClient.invalidateQueries(['getTotalReplies',postId]);
        }
    },[[replyMutation]])

    const handleSubmit = async () => {
        refId ? await onRegisterReply() :await onRegisterComment();
    }

    const handleChangeTextArea = (event : ChangeEvent) => {
        const input = event.target as HTMLTextAreaElement;
        setReplyPayload(input.value);
    }

    return(
        <div>
            <div className={style.form}>
                <textarea value={replyPayload} onChange={handleChangeTextArea} className={style.input} placeholder={"댓글을 달아보세요!"} ref={textAreaRef}/>
                <button className={style.input_btn} onClick={handleSubmit}>등록</button>
            </div>
        </div>
    )
}

export default BoardReplyInputAdd;
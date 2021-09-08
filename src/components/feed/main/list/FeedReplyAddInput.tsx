import style from "./feedReplyAddInput.module.css";
import {useMutation, useQueryClient} from "react-query";
import {FormEvent, useCallback, useState} from "react";
import {registerReply} from "src/apis/Reply";
import {IFeedReplyAddProps} from "src/domain/Reply";

const FeedReplyAddInput = ({feedId, refId, refUser} : IFeedReplyAddProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const [replyPayload, setReplyPayload] = useState("");
    const commentMutation = useMutation(()=>registerReply("FEED",feedId,replyPayload,"gudwh14"));
    const replyMutation = useMutation(()=>registerReply("FEED_REPLY",feedId,replyPayload,"jjo97",refId,refUser));

    const onRegisterReply = useCallback(async ()=> {
        try {
            const response = await replyMutation.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['feedReply',feedId]);
            await queryClient.invalidateQueries(['reply',refId]);
        }
    },[replyMutation])

    const onRegisterComment = useCallback(async ()=> {
        try {
            const response = await commentMutation.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReplyPayload("");
            await queryClient.invalidateQueries(['feedReply',feedId]);
        }
    },[commentMutation])

    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        refId ? await onRegisterReply(): await onRegisterComment();
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input value={replyPayload} onChange={(e)=> setReplyPayload(e.target.value)} className={style.input} placeholder={"댓글입력"}/>
            <button disabled={replyPayload ? false : true} type={"submit"} className={replyPayload ? style.input_btn_active : style.input_btn_inactive}>입력</button>
        </form>
    );
};

export default FeedReplyAddInput;

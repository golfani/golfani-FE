import style from "./feedReplyAddInput.module.css";
import {useMutation, useQueryClient} from "react-query";
import {FormEvent, useCallback, useState} from "react";
import {registerReply} from "src/apis/Reply";
import {IFeedReplyAddProps} from "src/domain/Reply";

const FeedReplyAddInput = ({feedId, replyId} : IFeedReplyAddProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const [reply, setReply] = useState("");
    const commentMutation = useMutation(()=>registerReply("FEED",feedId,reply,"gudwh14"));
    const replyMutation = useMutation(()=>registerReply("FEED_REPLY",feedId,reply,"gudwh14",replyId));

    const onRegisterReply = useCallback(async ()=> {
        try {
            const response = await replyMutation.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReply("");
            await queryClient.invalidateQueries(['feedReply',feedId]);
            await queryClient.invalidateQueries(['reply',replyId]);
        }
    },[reply])

    const onRegisterComment = useCallback(async ()=> {
        try {
            const response = await commentMutation.mutateAsync();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setReply("");
            await queryClient.invalidateQueries(['feedReply',feedId]);
        }
    },[reply])

    const handleSubmit = async (event : FormEvent) => {
        event.preventDefault();
        replyId ? await onRegisterReply(): await onRegisterComment();
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input value={reply} onChange={(e)=> setReply(e.target.value)} className={style.input} placeholder={"댓글입력"}/>
            <button disabled={reply ? false : true} type={"submit"} className={reply ? style.input_btn_active : style.input_btn_inactive}>입력</button>
        </form>
    );
};

export default FeedReplyAddInput;

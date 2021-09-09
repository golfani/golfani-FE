import style from './detailMenuModal.module.css';
import {useMutation, useQueryClient} from "react-query";
import {deleteReply, IReplyDto} from "src/apis/Reply";
import {useCallback, useRef} from "react";
import {handleClickRefOutSide} from "../../utils/clickUtil";
import {log} from "util";

type TRef = "FEED" | "POST" | "FEED_REPLY" | "POST_REPLY"

export interface DetailMenuModalProps {
    open : boolean
    setOpen : (state : boolean) => void
    reply : IReplyDto
    type : TRef
}

const userId = "gudwh14";

const DetailMenuModal = (props : DetailMenuModalProps) : JSX.Element=> {
    const ref = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const deleteReplyMutate = useMutation(()=> deleteReply(props.reply.id));

    const onDeleteReply = useCallback(async ()=> {
        try {
            const response = await deleteReplyMutate.mutateAsync();
        } catch (e) {

        }
        finally {
            if(props.type === 'FEED_REPLY') {
                await console.log("DELETE FEED_REPLY");
                await queryClient.invalidateQueries(['feedReply',props.reply.feedId]);
                await queryClient.invalidateQueries(['reply',props.reply.id]);
                await props.setOpen(false);
            }
        }
    },[deleteReplyMutate])

    const onCloseModal = () => {
        props.setOpen(false);
    }

    const handleClickDelete = async () => {
        await onDeleteReply();
    }

    handleClickRefOutSide(ref,onCloseModal);

    return (
        <div className={props.open ? style.modal_open : style.modal_close }>
            <div className={style.container} ref={ref}>
                {props.reply.userId === userId &&
                    <button className={style.menu_black_btn} onClick={handleClickDelete}>삭제</button>
                }
                <button className={style.menu_red_btn}>신고</button>
            </div>
        </div>
    );
};

export default DetailMenuModal;

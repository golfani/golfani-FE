import style from './detailMenuModal.module.css';
import {useMutation, useQueryClient} from "react-query";
import {deleteFeedReply, IReplyDto} from "src/apis/Reply";
import {useCallback, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {deleteFeed, IFeedContent} from "src/apis/Feed";
import ReportModal from "./ReportModal";

export type TRef = "FEED" | "POST" | "FEED_REPLY" | "POST_REPLY"

export interface DetailMenuModalProps {
    open : boolean
    setOpen : (state : boolean) => void
    target : IReplyDto | IFeedContent
    type : TRef
}

const userId = "gudwh14";

const DetailMenuModal = (props : DetailMenuModalProps) : JSX.Element=> {
    const ref = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const deleteFeedReplyMutate = useMutation(()=> deleteFeedReply(props.target.id));
    const deleteFeedMutate = useMutation(() => deleteFeed(props.target.id));
    const [reportModalOpen, setReportModalOpen] = useState(false);

    const onDeleteTarget = useCallback(async ()=> {
        try {
            if(props.type === 'FEED_REPLY') {
                const response = await deleteFeedReplyMutate.mutateAsync();
            }
            else if(props.type === 'FEED') {
                const response = await deleteFeedMutate.mutateAsync();
            }
        } catch (e) {

        }
        finally {
            if(props.type === 'FEED_REPLY') {
                const target : IReplyDto = props.target as IReplyDto;
                await queryClient.invalidateQueries(['feedReply',target.feedId]);
                await queryClient.invalidateQueries(['reply',target.id]);
                await props.setOpen(false);
            }
            else if(props.type === "FEED") {
                const target : IFeedContent = props.target as IFeedContent;
                await props.setOpen(false);
                await queryClient.invalidateQueries('feed');
            }
        }
    },[deleteFeedReplyMutate])

    const onCloseModal = () => {
        props.setOpen(false);
    }

    const handleClickDelete = async () => {
        await onDeleteTarget();
    }

    const onOpenReportModal = () => {
        setReportModalOpen((reportModalOpen)=> true);
    }

    const onCloseReportModal = () => {
        setReportModalOpen((reportModalOpen)=> false);
    }

    const handleClickReport = () => {
        onOpenReportModal();
    }

    handleClickRefOutSide(ref,onCloseModal);

    return (
        <div className={props.open ? style.modal_open : style.modal_close }>
            <div className={style.container} ref={ref}>
                    {props.target.userId === userId &&
                    <button className={style.menu_black_btn} onClick={handleClickDelete}>삭제</button>
                }
                <button className={style.menu_red_btn} onClick={handleClickReport}>신고</button>
                <ReportModal open={reportModalOpen} targetId={props.target.id} type={props.type} onCloseModal={onCloseReportModal}/>
            </div>
        </div>
    );
};

export default DetailMenuModal;

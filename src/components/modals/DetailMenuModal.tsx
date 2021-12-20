import style from './detailMenuModal.module.css';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteFeedReply, IReplyDto} from "src/apis/Reply";
import {useCallback, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {deleteFeed, IFeedContent} from "src/apis/Feed";
import ReportModal from "./ReportModal";
import {getCookie} from "src/utils/cookieUtil";
import FeedModifyModal from "./feed/FeedModifyModal";
import {deleteScrap, IScrapDto, isScrapped, registerScrap} from "src/apis/Scrap";

export type TRef = "FEED" | "POST" | "FEED_REPLY" | "POST_REPLY"

export interface DetailMenuModalProps {
    setModalOpen: (state : boolean) => void
    target: IReplyDto | IFeedContent
    type: TRef
}

const DetailMenuModal = (props: DetailMenuModalProps): JSX.Element => {
    const userId = getCookie('userId');
    const ref = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const deleteFeedReplyMutate = useMutation(() => deleteFeedReply(props.target.id));
    const deleteFeedMutate = useMutation(() => deleteFeed(props.target.id));
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [feedModifyModalOpen, setFeedModifyModalOpen] = useState(false);
    const scrapMutate = useMutation((scrapDto : IScrapDto)=> registerScrap(scrapDto));
    const [isMobileClose, setIsMobileClose] = useState(false);
    const isScrappedQuery = useQuery(['isScrapped',props.type,props.target.id], () => isScrapped(props.type, props.target.id));
    const deleteScrapMutate = useMutation((id:number)=> deleteScrap(id));

    const onModalClose = () => {
        if(typeof window !== 'undefined') {
            if(window.innerWidth <= 768) {
                setIsMobileClose(true);
                setTimeout(()=> {
                    props.setModalOpen(false);
                }, 300);
            }
            else {
                props.setModalOpen(false);
            }
        }
    }

    const onDeleteTarget = useCallback(async () => {
        try {
            if (props.type === 'FEED_REPLY') {
                const response = await deleteFeedReplyMutate.mutateAsync();
            } else if (props.type === 'FEED') {
                const response = await deleteFeedMutate.mutateAsync();
            }
        } catch (e) {

        } finally {
            if (props.type === 'FEED_REPLY') {
                const target: IReplyDto = props.target as IReplyDto;
                await queryClient.invalidateQueries(['feedReply', target.feedId]);
                if(target.referenceId) {
                    await queryClient.invalidateQueries(['reply', target.referenceId]);
                    await queryClient.invalidateQueries(['totalReply', target.referenceId]);
                }
                await onModalClose();
            } else if (props.type === "FEED") {
                const target: IFeedContent = props.target as IFeedContent;
                await onModalClose();
                await queryClient.invalidateQueries('feed');
            }
        }
    }, [deleteFeedReplyMutate])

    const handleClickDelete = async () => {
        await onDeleteTarget();
    }

    const onOpenReportModal = () => {
        setReportModalOpen((reportModalOpen) => true);
    }

    const handleClickReport = () => {
        onOpenReportModal();
    }

    const onOpenFeedModifyModal = () => {
        setFeedModifyModalOpen(true);
    }

    const handleClickModify = () => {
        onOpenFeedModifyModal();
    }

    const onScrap = async () => {
        try {
            const scrapDto : IScrapDto = {
                userId : userId,
                refId : props.target.id,
                targetType : props.type
            }
            const response = await scrapMutate.mutateAsync(scrapDto);
            await onModalClose();
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleClickScrap = async () => {
        await onScrap();
    }

    const handleClickDeleteScrap = async () => {
        try {
            const response = await deleteScrapMutate.mutateAsync(isScrappedQuery.data);
        }
        catch (e) {

        }
        finally {
            await queryClient.invalidateQueries(['isScrapped',props.type,props.target.id]);
            await queryClient.invalidateQueries('scrapFeed');
            await queryClient.invalidateQueries('scrapPost');
            await queryClient.invalidateQueries('scrapAllFeed');
            await onModalClose();
        }
    }

    handleClickRefOutSide(ref, onModalClose);

    return (
        <div className={isMobileClose ? style.modal_close : style.modal}>
            <div className={isMobileClose ? style.container_close : style.container} ref={ref}>
                <button className={style.menu_btn} onClick={handleClickReport}>신고</button>
                {props.target.userId === userId &&
                <button className={style.menu_btn} onClick={handleClickDelete}>삭제</button>
                }
                {props.target.userId === userId && props.type === 'FEED' &&
                <button className={style.menu_btn} onClick={handleClickModify}>수정</button>
                }
                {(props.type === 'FEED' || props.type === 'POST') && !isScrappedQuery.data &&
                    <button className={style.menu_btn} onClick={handleClickScrap}>스크랩</button>
                }
                {(props.type === 'FEED' || props.type === 'POST') && isScrappedQuery.data &&
                <button className={style.menu_btn} onClick={handleClickDeleteScrap}>스크랩 취소</button>
                }
                <button className={style.menu_btn} onClick={onModalClose}>취소</button>
                {reportModalOpen &&
                <ReportModal
                    targetId={props.target.id}
                    type={props.type}
                    setModalOpen={setReportModalOpen}
                    closeMenuModal={onModalClose}
                />
                }
                {feedModifyModalOpen &&
                <FeedModifyModal
                    feed={props.target as IFeedContent}
                    setModalOpen={setFeedModifyModalOpen}
                    closeMenuModal={onModalClose}
                />}
            </div>
        </div>
    );
};

export default DetailMenuModal;

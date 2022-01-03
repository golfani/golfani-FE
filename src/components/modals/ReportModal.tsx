import style from './reportModal.module.css';
import {useRef, useState} from "react";
import {registerReport, TReportType} from "src/apis/Report";
import {TRef} from "./DetailMenuModal";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {isMobile} from "src/utils/detectDevice";

interface IReportModalProps {
    targetId : number
    type : TRef
    setModalOpen : (state : boolean)=> void
    closeMenuModal : () => void
}

const ReportModal = (props : IReportModalProps) : JSX.Element => {
    const [reportType, setReportType] = useState<TReportType | undefined>();
    const [description, setDescription] = useState('');
    const targetRef = useRef<HTMLDivElement>(null);

    const onReport = async (type? : TReportType) => {
        if (reportType || type) {
            try {
                const _reportType = reportType || type;
                const response = await registerReport(props.type, props.targetId, description, _reportType!);
                if (response.data) {
                    alert('신고가 접수되었습니다.');
                } else {
                    alert('이미 신고가 접수된 게시물 입니다.');
                }
            } catch (e) {
                alert('에러 발생 잠시 후 다시 시도해 주세요.');
                console.log(e);
            } finally {
                onModalClose();
                props.closeMenuModal();
            }
        }
        else {
            alert('신고사유를 선택해 주세요.');
        }
    }

    const onModalClose = () => {
        props.setModalOpen(false);
    }

    const handleClickReportType = (type : TReportType) => {
        isMobile() ? onReport(type) : setReportType(type);
    }

    const handleClickReportButton = async () => {
        await onReport();
    }

    handleClickRefOutSide(targetRef,onModalClose);

    return (
        <div className={style.modal}>
            <div className={style.modal_box} ref={targetRef}>
                <button className={reportType === 'REPORT_ABUSE' ? style.report_type_btn_active : style.report_type_btn} onClick={()=>handleClickReportType('REPORT_ABUSE')}>욕설</button>
                <button className={reportType === 'REPORT_PORN' ? style.report_type_btn_active : style.report_type_btn} onClick={()=>handleClickReportType('REPORT_PORN')}>음란성</button>
                <button className={reportType === 'REPORT_AD' ? style.report_type_btn_active : style.report_type_btn} onClick={()=>handleClickReportType('REPORT_AD')}>광고</button>
                <button className={reportType === 'REPORT_REPEAT' ? style.report_type_btn_active : style.report_type_btn} onClick={()=>handleClickReportType('REPORT_REPEAT')}>도배</button>
                <textarea className={style.report_description}
                          placeholder="신고 상세 내용..."
                          value={description}
                          onChange={(e)=>setDescription(e.target.value)}
                />
                <div className={style.action_box}>
                    <button onClick={onModalClose} className={style.cancel_btn}>취소</button>
                    <button onClick={handleClickReportButton} className={style.report_btn}>접수</button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;

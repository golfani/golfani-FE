import style from './reportModal.module.css';
import {ChangeEvent, useRef, useState} from "react";
import {registerReport, TReportType} from "src/apis/Report";
import {TRef} from "./DetailMenuModal";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import CloseIcon from '@material-ui/icons/Close'

interface IReportModalProps {
    open : boolean
    targetId : number
    type : TRef
    onCloseModal : ()=> void
}

const userId = "gudwh14";

const ReportModal = (props : IReportModalProps) : JSX.Element => {
    const [reportType, setReportType] = useState<string>();
    const [description, setDescription] = useState('');
    const targetRef = useRef<HTMLDivElement>(null);

    const handleRadioChange = (event : ChangeEvent<HTMLInputElement>) => {
        setReportType((reportType) => event.target.value);
    }

    const handleReport = async () => {
        if (reportType) {
            try {
                const response = await registerReport(props.type, props.targetId, userId, description, reportType as TReportType);
                if (response.data) {
                    alert('신고가 접수되었습니다.');
                } else {
                    alert('이미 신고가 접수된 게시물 입니다.');
                }
            } catch (e) {
                alert('에러 발생 잠시 후 다시 시도해 주세요.');
                console.log(e);
            } finally {
                props.onCloseModal();
            }
        }
        else {
            alert('신고사유를 선택해 주세요.');
        }
    }

    handleClickRefOutSide(targetRef,props.onCloseModal);

    return (
        <div className={props.open ? style.modal_open : style.modal_close}>
            <div className={style.modal_box} ref={targetRef}>
                <CloseIcon className={style.close_icon} color={"disabled"} onClick={props.onCloseModal}/>
                <span className={style.report_title}>신고 사유</span>
                <div>
                    <div className={style.report_type_box}>
                        <input type='radio' name='report_type' value={'REPORT_ABUSE'} onChange={handleRadioChange}/>
                        <span className={style.report_type_txt}>욕설</span>
                        <span>을 포함하고있는 컨텐츠입니다.</span>
                    </div>
                    <div className={style.report_type_box}>
                        <input type='radio' name='report_type' value={'REPORT_PORN'} onChange={handleRadioChange}/>
                        <span className={style.report_type_txt}>음란성</span>
                        <span>을 포함하고있는 컨텐츠입니다.</span>
                    </div>
                    <div className={style.report_type_box}>
                        <input type='radio' name='report_type' value={'REPORT_AD'} onChange={handleRadioChange}/>
                        <span className={style.report_type_txt}>광고</span>
                        <span>를 포함하고있는 컨텐츠입니다.</span>
                    </div>
                    <div className={style.report_type_box}>
                        <input type='radio' name='report_type' value={'REPORT_REPEAT'} onChange={handleRadioChange}/>
                        <span className={style.report_type_txt}>도배</span>
                        <span>를 포함하고있는 컨텐츠입니다.</span>
                    </div>
                    <textarea className={style.report_description}
                              placeholder="신고내용"
                              value={description}
                              onChange={(e)=>setDescription(e.target.value)}
                    />
                    <button onClick={handleReport} className={style.report_btn}>접수</button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;

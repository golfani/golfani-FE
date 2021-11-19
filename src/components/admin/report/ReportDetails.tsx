import style from './reportDetails.module.css';
import {useQuery, useQueryClient} from "react-query";
import {cancelReport, getReportDetails, IReportDto, TReport} from "src/apis/Report";

interface IReportDetailsProps {
    id : number
    type : TReport
    setReportDetailsOpen : (state : boolean) => void
}

const ReportDetails = ({id, type, setReportDetailsOpen} : IReportDetailsProps) : JSX.Element=> {
    const queryClient = useQueryClient();
    const reportDetailsQuery = useQuery<IReportDto[]>([`reportDetails,${id}`], () => getReportDetails(id,type));

    const onCancelReport = async (doDelete : boolean) => {
        try {
            const response = await cancelReport(type,id,doDelete);
            await setReportDetailsOpen(false);
            await queryClient.invalidateQueries(['reportList',type]);
        }
        catch (e) {

        }
    }

    const handleClickAction = async (doDelete : boolean) => {
        await onCancelReport(doDelete);
    }

    const handleClickContent = () => {
        // TODO : Content Link 기능 짜기
    }

    return (
        <div className={style.container}>
            <div>
                {reportDetailsQuery.data?.map((report)=> (
                    <div key={report.id} className={style.report_details_box}>
                        <span className={style.report_details_id_txt}>{report.id}</span>
                        <span className={style.report_details_type_txt}>{report.reportType}</span>
                        <span className={style.report_details_desc_txt}>{report.description}</span>
                    </div>
                ))}
            </div>
            <div className={style.select_box}>
                <button className={style.pass_box} onClick={()=>handleClickAction(false)}>PASS</button>
                <button className={style.kill_box} onClick={()=>handleClickAction(true)}>KILL</button>
                <button className={style.contents_box}>CONTENTS</button>
            </div>
        </div>
    );
};

export default ReportDetails;

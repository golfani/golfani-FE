import style from './reportList.module.css';
import {useQuery} from "react-query";
import {getReportList, TReport} from "src/apis/Report";
import ReportItem from "./ReportItem";

interface IReportListProps {
    type : TReport
}

const ReportList = ({type} : IReportListProps) : JSX.Element => {
    const reportQuery = useQuery(['reportList',type], () => getReportList(type));

    console.log(reportQuery.data);
    return (
        <div className={style.container}>
            {reportQuery.data?.map((item : any)=> (
                <ReportItem item={item} type={type} key={item.id}/>
            ))}
        </div>
    );
};

export default ReportList;

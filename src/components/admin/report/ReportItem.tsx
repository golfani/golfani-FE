import style from "./reportItem.module.css";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import {useState} from "react";
import ReportDetails from "./ReportDetails";
import {TReport} from "src/apis/Report";

interface IReportItem {
    item : any // TODO : Type 박아주기
    type : TReport
}

const ReportItem = ({item,type} : IReportItem) : JSX.Element => {
    const [reportDetailsOpen, setReportDetailsOpen] = useState(false);

    const handleClickDetailsView = () => {
        setReportDetailsOpen((reportDetailsOpen) => !reportDetailsOpen);
    }

    return (
        <div>
            <div className={style.report_box} onClick={handleClickDetailsView}>
                <span className={style.id_txt}>{item.id}</span>
                <span className={style.user_txt}>{item.userId}</span>
                {type === 'feed' &&
                <div className={style.content_box}>
                    <img className={style.img} src={item.urlList[LOW_LEVEL_FIRST_PICTURE]}/>
                    <span>{item.content}</span>
                </div>
                }
                {type === 'post' &&
                <div className={style.content_box}>
                    <span>{item.content}</span>
                </div>
                }
                {type === 'reply' &&
                <div className={style.content_box}>
                    <span>{item.payload}</span>
                </div>
                }
                <span className={style.report_count_txt}>{item.reportCount}</span>
                <KeyboardArrowDownRoundedIcon style={{width : '30px'}}/>
            </div>
            {reportDetailsOpen && <ReportDetails id={item.id} type={type} setReportDetailsOpen={setReportDetailsOpen}/>}
        </div>
    );
};

export default ReportItem;

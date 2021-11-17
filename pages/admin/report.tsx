import style from 'styles/admin.module.css'
import {useState} from "react";
import ReportList from "src/components/report/ReportList";
import {TReport} from "src/apis/Report";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {useRouter} from "next/router";

const Report = () : JSX.Element => {
    const [reportType , setReportType] = useState<TReport>();
    const router = useRouter();

    const handleClickReportType = (type : TReport) => {
        setReportType(type);
    }

    const handleClickBackIcon = () => {
        router.push('/admin');
    }

    return (
        <div className={style.container}>
            <div className={style.header_box}>
                <ArrowBackIosNewIcon className={style.header_icon} onClick={handleClickBackIcon}/>
                <h1 className={style.header_title}>관리자 페이지 - 신고 관리</h1>
            </div>
            <ul className={style.report_category_box}>
                <li
                    className={reportType === 'feed' ? style.category_txt_active : style.category_txt}
                    onClick={() => handleClickReportType('feed')}>
                    <span>피드</span>
                </li>
                <li className={reportType === 'post' ? style.category_txt_active : style.category_txt}
                    onClick={() => handleClickReportType('post')}>
                    <span>게시글</span>
                </li>
                <li className={reportType === 'reply' ? style.category_txt_active : style.category_txt}
                    onClick={() => handleClickReportType('reply')}>
                    <span>댓글</span>
                </li>
            </ul>
            <div className={style.title_box}>
                <span className={style.title_id}>id</span>
                <span className={style.title_user}>작성자</span>
                <span className={style.title_content}>내용</span>
                <span className={style.title_report}>신고수</span>
                <span className={style.title_view}>보기</span>
            </div>
            {reportType && <ReportList type={reportType}/>}
        </div>
    );
};

export default Report;

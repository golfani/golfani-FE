import style from 'src/components/shop/manage/statistic/shopStatisticPage.module.css'
import ShopStatistic from "./ShopStatistic";
import Navbar from "src/components/common/navbar/Navbar";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import UserChart from "./UserChart";
import RestartAltIcon from "@material-ui/icons/RestartAlt";

const ShopStatisticPage = () : JSX.Element => {
    return(
        <div className={style.container}>
            <Navbar/>
            <div className={style.statistic_box}>
                <div className={style.statistic_time_wrap}>
                    <span className={style.statistic_time}>2021-01-17(금) 01:10 기준</span>
                    <RestartAltIcon style={{fontSize:'17px',cursor:'pointer',color:"gray"}}/>
                </div>
                <div className={style.month_statistic_txt}>통계</div>
                <div className={style.comprehensive_indicator_box}>
                    <div className={style.date_wrap}>
                        <CalendarTodayIcon/>
                        <span className={style.date_txt}>2022년 01월</span>
                    </div>
                    <UserChart/>
                    <div className={style.shop_statistic_box}>
                        <div className={style.box_wrap}>
                            <span className={style.statistic_main_txt}>이번달 판매액</span>
                            <span className={style.accumulated_amount_txt}>1,112,000원</span>
                            <span className={style.amount_gap_txt}>저번 달 대비 32,000원 <em>상승</em></span>
                        </div>
                        <div className={style.box_wrap}>
                            <span className={style.statistic_main_txt}>이번달 방문자수</span>
                            <span className={style.accumulated_amount_txt}>1200명</span>
                            <span className={style.amount_gap_txt}>저번 달 대비 120명 <em>하락</em></span>
                        </div>
                        <div className={style.box_wrap}>
                            <span className={style.statistic_main_txt}>이번달 예약수</span>
                            <span className={style.accumulated_amount_txt}>27건</span>
                            <span className={style.amount_gap_txt}>저번 달 대비 12건 <em>상승</em></span>
                        </div>
                        <div className={style.box_wrap}>
                            <span className={style.statistic_main_txt}>핫 게시물</span>
                        </div>
                    </div>
                </div>
                <div className={style.statistic_wrap}>
                    <ShopStatistic/>
                </div>
            </div>
        </div>
    )
}
export default ShopStatisticPage;

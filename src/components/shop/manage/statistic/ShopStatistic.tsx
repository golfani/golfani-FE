import style from './shopStatistic.module.css';
import RestartAltIcon from "@material-ui/icons/RestartAlt";
import VisitorsChart from "./VisitorsChart";
import SaleChart from "./SaleChart";

const ShopStatistic = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.visit_wrap}>
                <div className={style.box_wrap}>
                    <div className={style.visit_txt}>방문자 수</div>
                </div>
                <div className={style.view_box}><VisitorsChart/></div>
                <div className={style.box_wrap}>
                    <div className={style.visit_txt}>판매량</div>
                </div>
                <div className={style.view_box}><SaleChart/></div>
            </div>
        </div>
    )
}

export default ShopStatistic;

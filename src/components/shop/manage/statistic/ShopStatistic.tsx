import style from './shopStatistic.module.css';
import RestartAltIcon from "@material-ui/icons/RestartAlt";

const ShopStatistic = () : JSX.Element => {
    return(
        <div className={style.container}>
            <div className={style.statistic_time_wrap}>
                <span className={style.statistic_time}>2021-01-17(금) 01:10 기준</span>
                <RestartAltIcon style={{fontSize:'17px',cursor:'pointer',color:"gray"}}/>
            </div>
            <div className={style.visit_wrap}>
                <div className={style.box_wrap}>
                    <div className={style.visit_txt}>방문자 수</div>
                </div>
                <div className={style.view_box}></div>
                <div className={style.box_wrap}>
                    <div className={style.visit_txt}>판매량</div>
                </div>
                <div className={style.view_box}></div>
                <div className={style.box_wrap}>
                    <div className={style.visit_txt}>방문자 수</div>
                </div>
                <div className={style.view_box}></div>
            </div>
        </div>
    )
}

export default ShopStatistic;

import style from 'src/components/shop/manage/statistic/shopManagePage.module.css'
import ShopInfo from "../ShopInfo";
import RestartAltIcon from '@material-ui/icons/RestartAlt';
import {useState} from "react";
import ShopStatistic from "./ShopStatistic";
import ShopReservation from "./ShopReservation";

type TStatistic = "통계" | "예약현황";
const ShopManagePage = () : JSX.Element => {
    const [activeMenu, setActiveMenu] = useState<TStatistic>("통계");

    const onClickStatisticMenu = (type : TStatistic) => {
        setActiveMenu(type);
    }

    return(
        <div className={style.container}>
            <ShopInfo/>
            <div className={style.statistic_wrap}>
                <ul className={style.statistic_header}>
                    <li>
                        <div className={style.statistic_menu}>
                            <span className={activeMenu == "통계" ? style.statistic_txt_clicked: style.statistic_txt} onClick={()=>onClickStatisticMenu("통계")}>통계</span>
                        </div>
                    </li>
                    <li>
                        <div className={style.statistic_menu}>
                            <span className={activeMenu == "예약현황" ? style.statistic_txt_clicked: style.statistic_txt} onClick={()=>onClickStatisticMenu("예약현황")}>예약확인</span>
                        </div>
                    </li>
                </ul>
                {
                    activeMenu == "통계" ? <ShopStatistic/> : <ShopReservation/>
                }

            </div>
        </div>
    )
}
export default ShopManagePage;

import Calendar from "src/components/common/calendar/Calendar";
import style from  "styles/shopManage.module.css";
import Navbar from "../../../../src/components/common/navbar/Navbar";

const Reservation = () : JSX.Element => {
    return(
        <div className={style.container}>
            <Navbar/>
            <Calendar/>
        </div>
    )
}

export default Reservation;

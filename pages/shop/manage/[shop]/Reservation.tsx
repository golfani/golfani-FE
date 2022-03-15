import style from "styles/shopManage.module.css";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("src/components/common/calendar/Calendar"));
const Navbar = dynamic(() => import("src/components/common/navbar/Navbar"));

const Reservation = (): JSX.Element => {
    return (
        <div className={style.container}>
            <Navbar/>
            <Calendar/>
        </div>
    )
}

export default Reservation;

import style from './calendar.module.css';
import {getCalendar} from "src/utils/calendar";
import {useRef} from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const mockData = [4,8,10,12,13,15,16,20,25,30];

const Calendar = (): JSX.Element => {
    const {startDay, totalOfDay} = getCalendar(2022, 1);
    const dayArray = useRef(new Array(startDay + totalOfDay!).fill(0));

    const renderCalendar = dayArray.current.map((key, index) => {
        if (index % 7 === 0) {
            return (
                <div key={index} className={style.day_box}>
                    {
                        dayArray.current.slice(index, index + 7).map((value, i) => {
                            if (index + i >= startDay) {
                                return (<div className={style.date_box} key={index + i}>
                                    <span className={style.date_txt}>{index + i + 1 - startDay}</span>
                                    {mockData.indexOf(index + i + 1 - startDay) > -1 && <FiberManualRecordIcon className={style.reservation_icon} style={{fontSize : 12}}/>}
                                </div>)
                            } else
                                return (<span className={style.day_txt} key={index + i}></span>)
                        })
                    }
                </div>
            )
        }
    });

    return (
        <div className={style.container}>
            <span className={style.year_txt}>2022</span>
            <div className={style.info_box}>
                <FiberManualRecordIcon className={style.reservation_icon} style={{fontSize : 12}}/>
                <span className={style.info_txt}>예약이 존재하는 날짜입니다</span>
            </div>
            <div className={style.month_box}>
                <ArrowBackIosRoundedIcon className={style.arrow_icon} style={{fontSize : 18}}/>
                <span className={style.month_txt}>1월</span>
                <ArrowForwardIosRoundedIcon className={style.arrow_icon} style={{fontSize : 18}}/>
            </div>
            <div className={style.calendar_box}>
                <div className={style.day_header_box}>
                    <span className={style.day_txt}>일</span>
                    <span className={style.day_txt}>월</span>
                    <span className={style.day_txt}>화</span>
                    <span className={style.day_txt}>수</span>
                    <span className={style.day_txt}>목</span>
                    <span className={style.day_txt}>금</span>
                    <span className={style.day_txt}>토</span>
                </div>
                <div>
                    {renderCalendar}
                </div>
            </div>
        </div>
    );
};

export default Calendar;

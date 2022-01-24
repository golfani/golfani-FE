import style from 'src/components/shop/manage/item/reservation.module.css';

interface ITimeItem {
    isSold : boolean;
}
const ReservationTimeItem = ({isSold} : ITimeItem) : JSX.Element =>{

    return(
        <div className={style.container}>
            {
                <div className={ isSold ? style.time_box : style.time_box_sold}>
                    <span>09:00</span>
                </div>
            }
        </div>
    )
}

export default ReservationTimeItem;
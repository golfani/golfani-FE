import style from 'src/components/modals/shop/manage/itemReservation.module.css';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ReservationTimeItem from "src/components/shop/manage/item/ReservationTimeItem";
import ReservationItem from "src/components/shop/manage/item/ReservationItem";
import {useRef} from "react";


const ItemReservationModal = () : JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);

    return(
        <div className={style.container}>
            <div className={style.modal_box} ref={ref}>
                <div className={style.date_box}>
                    <ArrowBackIosRoundedIcon style={{fontSize:'15px'}} className={style.arrow_icon}/>
                    <span className={style.date_txt}>2022-01-14(금)</span>
                    <ArrowForwardIosRoundedIcon style={{fontSize:'15px'}} className={style.arrow_icon}/>
                </div>
                <div className={style.table_wrap}>
                    <div className={style.time_table}>
                        <span className={style.reservation_info_txt}>예약시간</span>
                        <div className={style.morning_box}>
                            <span className={style.time_txt}>오전</span>
                            <div className={style.time_box}>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={true}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={true}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                            </div>
                        </div>
                        <div className={style.lunch_box}>
                            <span className={style.time_txt}>점심시간</span>
                            <span style={{color:'red', fontWeight:'bold'}}>12:00 ~ 13:00</span>
                        </div>
                        <div className={style.evening_box}>
                            <span className={style.time_txt}>오후</span>
                            <div className={style.time_box}>
                                <ReservationTimeItem isSold={true}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={false}/>
                                <ReservationTimeItem isSold={true}/>
                                <ReservationTimeItem isSold={false}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.info_table}>
                        <span className={style.reservation_info_txt}>예약내용</span>
                        <div className={style.info_box}>
                            <div>
                                <span className={style.reservation_item_txt}>예약일시</span>
                                <span className={style.reservation_date_txt}>2022-01-22(토) <em className={style.reservation_time_txt}>09:30</em></span>
                            </div>
                                <div className={style.info_box}>
                                    <span className={style.reservation_item_txt}>예약자명단</span>
                                    <div className={style.reservation_list_box}>
                                        <span className={style.reservation_name_txt_click}>이용준</span>
                                        <span className={style.reservation_name_txt}>차형조</span>
                                    </div>
                            </div>
                        </div>
                        <div className={style.reservation_item_box}>
                            <span className={style.reservation_item_txt}>예약상품</span>
                            <ReservationItem/>
                        </div>
                    </div>
                </div>
                <button className={style.cancel_btn}>취소</button>
                <button className={style.confirm_btn}>확인</button>
            </div>
        </div>
    )
}

export default ItemReservationModal;

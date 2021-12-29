import style from './shopNotice.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import ShopRegNoticeModal from "src/components/modals/shop/ShopRegNotiveModal";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ShopNotice = () : JSX.Element => {

    return(
        <div className={style.container} id="notice">
            <Link href="#top">
                <div className={style.menu_title}> 공지사항</div>
            </Link>
            <div className={style.line}></div>
            <>
                <div className={style.notice_wrap}>
                    <span className={style.notice_text} style={{color:"red",fontWeight:"bold"}}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap} style={{backgroundColor:'#ddd'}}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>코로나 관련 공지</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap} style={{backgroundColor:'#ddd'}}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap} style={{backgroundColor:'#ddd'}}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap} style={{backgroundColor:'#ddd'}}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.notice_wrap} style={{backgroundColor:'#ddd'}}>
                    <span className={style.notice_text}>[공지]</span>
                    <span>매장 방문시 유의사항</span>
                    <MoreVertIcon />
                </div>
                <div className={style.page_wrap}>
                    <ArrowBackIosIcon style={{fontSize:'17px'}}/>
                    <ArrowBackIosIcon style={{transform:'rotateY(180deg)',fontSize:'17px'}}/>
                </div>
                <div className={style.floating_btn}>
                    <span className={style.notice_insert}>공지사항 추가</span>
                </div>
            </>
            <ShopRegNoticeModal/>
        </div>
    )
}

export default ShopNotice;


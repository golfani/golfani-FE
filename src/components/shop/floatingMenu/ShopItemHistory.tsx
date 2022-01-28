import style from './shopItemHistory.module.css';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";

interface IShopItemHistoryProps {
    setModalOpen: (state: boolean) => void
}

const ShopItemHistory = (props: IShopItemHistoryProps): JSX.Element => {
    const [close, setClose] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onModalClose = () => {
        setClose(true);
        setTimeout(() => {
            props.setModalOpen(false);
        }, 200);
    }

    const handleClickBackIcon = () => {
        onModalClose();
    }

    handleClickRefOutSide(ref, onModalClose);

    return (
        <div className={'modal_container'}>
            <div className={close ? style.container_close : style.container} ref={ref}>
                <div className={style.title_box}>
                    <ArrowBackIosNewIcon className={style.icon} onClick={handleClickBackIcon}/>
                    <span className={style.title_txt}>상품 히스토리</span>
                </div>
                <div className={style.item_container}>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                    <div className={style.item_box}>
                        <img alt={'golfClub'} src={'/golf_club.webp'} className={style.item_img}/>
                        <span className={style.item_txt}>에픽 맥스 패스트 드라이버</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopItemHistory;

import style from './shopStoreHistory.module.css';
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosNew";
import {useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";

interface IShopStoreHistoryProps {
    setModalOpen: (state: boolean) => void
}

const ShopStoreHistory = (props: IShopStoreHistoryProps): JSX.Element => {
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
                    <span className={style.title_txt}>스토어 히스토리</span>
                </div>
                <div className={style.item_container}>
                    <div className={style.item_box}>
                        <span className={style.store_txt}>골프프렌드 수원 송죽점</span>
                        <span className={style.store_location_txt}>수원시 장안구 조원동 16-9</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                    <div className={style.item_box}>
                        <span className={style.store_txt}>수원 골프백화점</span>
                        <span className={style.store_location_txt}>수원시 장안구 조원동 16-9</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                    <div className={style.item_box}>
                        <span className={style.store_txt}>아일랜드 골프 수원 인계점</span>
                        <span className={style.store_location_txt}>수원시 장안구 조원동 16-9</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                    <div className={style.item_box}>
                        <span className={style.store_txt}>골마켓 수원 조원점</span>
                        <span className={style.store_location_txt}>수원시 장안구 조원동 16-9</span>
                        <button className={style.delete_btn}>X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopStoreHistory;

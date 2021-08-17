import style from './recommendList.module.css';
import EntireItem from "./EntireItem";
import SellingItem from "./SellingItem";
import {RefObject} from "react";

interface RecommendListProps {
    recommendRef : RefObject<HTMLDivElement>
}

const RecommendList = ({recommendRef} : RecommendListProps) : JSX.Element => {
    return (
        <div className={style.container_active}>
            <div className={style.blank} ref={recommendRef}></div>
            <div className={style.title_box}>
                <span className={style.title_txt}>회원님에게 추천하는 골프채</span>
                <span className={style.title_txt}>현재 판매중인 추천 골프채</span>
            </div>
            <div className={style.item_box}>
                <EntireItem/>
                <SellingItem/>
            </div>
        </div>
    );
};

export default RecommendList;
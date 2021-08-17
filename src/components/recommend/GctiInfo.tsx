import style from "./gctiInfo.module.css";
import Image from "next/image";
import img from "public/img.png";
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';

interface GctiInfoProps {
    scrollToRef : () => void;
}

const GctiInfo = ({scrollToRef} : GctiInfoProps) : JSX.Element => {
    return (
        <div className={style.container}>
            <h1 className={style.title_txt}>골프 장비추천</h1>
            <span className={style.title_sub_txt}>나의 골프장비 성향을 통해 장비추천을 받아보세요</span>
            <div className={style.gcti_box}>
                <Image className={style.img} src={img}/>
                <span className={style.gcti_txt}>ESFP</span>
                <span
                    className={style.gcti_sub_txt}>이별에 대한 미련이 없는편<br/>슬퍼하는 시간에 많은 신경을 쓰지 않고<br/>새로운 사람을 만나는데 신경을 씀</span>
            </div>
            <div className={style.graph_box}>
                <div className={style.graph_row}>
                    <span className={style.bias_active_txt}>입문자(E)</span>
                    <div className={style.bias_box}>
                        <span className={style.left_bias_active}></span>
                        <span className={style.divider}></span>
                        <span className={style.right_bias}></span>
                    </div>
                    <span className={style.bias_inactive_txt}>숙련자(I)</span>
                </div>
                <div className={style.graph_row}>
                    <span className={style.bias_inactive_txt}>과금(N)</span>
                    <div className={style.bias_box}>
                        <span className={style.left_bias}></span>
                        <span className={style.divider}></span>
                        <span className={style.right_bias_active}></span>
                    </div>
                    <span className={style.bias_active_txt}>가성비(S)</span>
                </div>
                <div className={style.graph_row}>
                    <span className={style.bias_inactive_txt}>헬창(T)</span>
                    <div className={style.bias_box}>
                        <span className={style.left_bias}></span>
                        <span className={style.divider}></span>
                        <span className={style.right_bias_active}></span>
                    </div>
                    <span className={style.bias_active_txt}>비실이(F)</span>
                </div>
                <div className={style.graph_row}>
                    <span className={style.bias_active_txt}>과금(P)</span>
                    <div className={style.bias_box}>
                        <span className={style.left_bias_active}></span>
                        <span className={style.divider}></span>
                        <span className={style.right_bias}></span>
                    </div>
                    <span className={style.bias_inactive_txt}>가성비(J)</span>
                </div>
                <span className={style.retry_txt}>성향 테스트 다시하기</span>
            </div>
            <div className={style.recommend_box}>
                <span className={style.recommend_txt}>장비 추천받기</span>
                <ArrowDropDownCircleRoundedIcon onClick={scrollToRef} className={style.recommend_icon} color={"info"}/>
            </div>
        </div>
    );
};

export default GctiInfo;

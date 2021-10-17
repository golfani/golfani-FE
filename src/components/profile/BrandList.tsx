import style from './brandList.module.css';
import BrandItem from "./BrandItem";

const BrandList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>보유 브랜드</span>
            <BrandItem/>
        </div>
    );
};

export default BrandList;

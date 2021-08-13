import style from './brandList.module.css';
import BrandItem from "./BrandItem";

const BrandList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>내 아이템</span>
            <BrandItem/>
        </div>
    );
};

export default BrandList;
import style from './brandItem.module.css';
import {IBrandDto} from "src/apis/Brand";

interface IBrandItemProps {
    brand : IBrandDto
}
const BrandItem = ({brand} : IBrandItemProps) : JSX.Element => {
    return (
        <div className={style.item_box}>
            <span className={style.brand_id}>{brand.id}</span>
            <img src={brand.imageUrl} alt={brand.brandName} className={style.brand_img}/>
            <span className={style.brand_name_txt}>{brand.brandName}</span>
        </div>
    );
};

export default BrandItem;

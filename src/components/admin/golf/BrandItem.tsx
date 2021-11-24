import style from './brandItem.module.css';
import {IBrandDto} from "src/apis/Brand";

interface IBrandItemProps {
    brand : IBrandDto
    selectedBrand? : IBrandDto
    setSelectedBrand : (state? : IBrandDto) => void
    setOpenBrandAdd : (state : boolean) => void
}

const BrandItem = ({brand,selectedBrand, setSelectedBrand,setOpenBrandAdd} : IBrandItemProps) : JSX.Element => {
    const handleClickBrand = () => {
        setSelectedBrand(brand);
        setOpenBrandAdd(false);
    }

    return (
        <div className={selectedBrand?.id === brand.id ? style.item_box_selected : style.item_box} onClick={handleClickBrand}>
            <span className={style.brand_id}>{brand.id}</span>
            <img src={brand.imageUrl} alt={brand.brandName} className={style.brand_img}/>
            <span className={style.brand_name_txt}>{brand.brandName}</span>
        </div>
    );
};

export default BrandItem;

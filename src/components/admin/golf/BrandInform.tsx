import style from './brandInform.module.css';
import {deleteBrand, IBrandDto} from "src/apis/Brand";
import GolfClubAdd from "./GolfClubAdd";
import {useState} from "react";
import GolfClubList from "./GolfClubList";
import {TGolfClub} from "src/apis/GolfClub";
import {useRouter} from "next/router";

interface IBrandInformProps {
    brand : IBrandDto
}

const BrandInform = ({brand} : IBrandInformProps) : JSX.Element => {
    const [openGolfClubAdd , setOpenGolfClubAdd] = useState(false);
    const [type, setType] = useState<TGolfClub>();
    const router = useRouter();

    const onSetFalseGolfClubAdd = () => {
        setOpenGolfClubAdd(false);
    }

    const onDeleteBrand = async () => {
        try {
            const response = await deleteBrand(brand.id);
            router.reload();
        }
        catch (e) {
            alert(`${e} 서버 에러 발생!`);
        }
    }

    const handleClickGolfClubAddButton = () => {
        setOpenGolfClubAdd((openGolfClubAdd) => !openGolfClubAdd);
    }

    const handleClickAllView = () => {
        setType(undefined);
        onSetFalseGolfClubAdd();
    }

    const handleClickGolfClubType = (type : TGolfClub) => {
        setType(type);
        onSetFalseGolfClubAdd();
    }

    const handleClickDeleteBrand = async () => {
        if(window.confirm(`${brand.brandName} 브랜드정보를 삭제하시겠습니까?`)) {
            await onDeleteBrand();
        }
    }

    return (
        <div className={style.container}>
            <div className={style.brand_title_box}>
                <img src={brand.imageUrl} className={style.brand_logo_img}/>
                <div>
                    <span className={style.brand_name_txt}>{brand.brandName}</span>
                    <span className={style.brand_desc_txt}>{brand.brandDescription}</span>
                </div>
                <div className={style.brand_btn_box}>
                    <button className={style.brand_modify_btn}>수정</button>
                    <button className={style.brand_delete_btn} onClick={handleClickDeleteBrand}>삭제</button>
                </div>
            </div>
            <div className={style.golfClub_type_box}>
                <ul className={style.golfClub_type_list_box}>
                    <li className={type ? style.golfClub_type_list : style.golfClub_type_list_active}
                        onClick={handleClickAllView}>전체
                    </li>
                    <li className={type === 'PUTTER' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('PUTTER')}>PUTTER
                    </li>
                    <li className={type === 'DRIVER' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('DRIVER')}>DRIVER
                    </li>
                    <li className={type === 'WOOD' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('WOOD')}>WOOD
                    </li>
                    <li className={type === 'IRON' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('IRON')}>IRON
                    </li>
                    <li className={type === 'WEDGE' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('WEDGE')}>WEDGE
                    </li>
                    <li className={type === 'UTIL' ? style.golfClub_type_list_active : style.golfClub_type_list}
                        onClick={() => handleClickGolfClubType('UTIL')}>UTIL
                    </li>
                </ul>
                <button className={style.golfClub_add_btn} onClick={handleClickGolfClubAddButton}>장비추가</button>
            </div>
            <div className={style.golfClub_main_box}>
                {openGolfClubAdd ? <GolfClubAdd setOpenGolfClubAdd={setOpenGolfClubAdd} brandId={brand.id}/> : <GolfClubList type={type} brandId={brand.id}/>}
            </div>
        </div>
    );
};

export default BrandInform;

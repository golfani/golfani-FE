import style from './shopMap.module.css';
import district from 'public/data/korea-administrative-district.json';
import {useState} from "react";

const ShopMap = () : JSX.Element => {
    const [highLevelDistrict, setHighLevelDistrict] = useState("");
    const [lowLevelDistrict, setLowLevelDistrict] = useState("");

    const handleClickHighDistrict = (district : string) => {
        setHighLevelDistrict(district);
    }

    const handleClickLowDistrict = (district : string) => {
        setLowLevelDistrict(district);
    }

    const handleClickSelectedHighDistrict = () => {
        setHighLevelDistrict('');
        setLowLevelDistrict('');
    }

    const handleClickSelectedLowDistrict = () => {
        setLowLevelDistrict('');
    }

    return (
        <div className={style.container}>
            <span className={style.title_txt}>매장 지역선택</span>
            {highLevelDistrict
                ?
                <div className={style.select_box}>
                    <span className={style.district_select_txt} onClick={handleClickSelectedHighDistrict}>{highLevelDistrict}</span>
                    {lowLevelDistrict && <span className={style.district_select_txt} onClick={handleClickSelectedLowDistrict}>{lowLevelDistrict}</span>}
                </div>
                :
                <div className={style.district_box}>
                    {Object.keys(district).map((data) => (
                        <span key={data} className={style.district_txt} onClick={() => handleClickHighDistrict(data)}>{data}</span>
                    ))}
                </div>
            }
            { highLevelDistrict && !lowLevelDistrict &&
                <div className={style.district_box}>
                    {district[highLevelDistrict as keyof typeof district].map((data) => (
                        <span key={data} className={style.district_txt} onClick={() => handleClickLowDistrict(data)}>{data}</span>
                    ))}
                </div>
            }
        </div>
    );
};

export default ShopMap;

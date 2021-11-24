import style from './brandList.module.css';
import BrandAdd from "./BrandAdd";
import {useQuery} from "react-query";
import {getBrandListWithStartName, IBrandDto} from "src/apis/Brand";
import {IPages} from "src/domain/Page";
import BrandItem from "./BrandItem";
import SearchIcon from '@material-ui/icons/Search';
import {useState} from "react";
import BrandInform from "./BrandInform";

const BrandList = () : JSX.Element => {
    const [startName, setStartName] = useState('');
    const brandQuery = useQuery<IPages<IBrandDto>>(['brandList',startName], ()=>getBrandListWithStartName(startName,0,Number.MAX_SAFE_INTEGER,'id,asc'));
    const [openBrandAdd, setOpenBrandAdd] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<IBrandDto>();

    const handleClickBrandAdd = () => {
        setOpenBrandAdd(true);
        setSelectedBrand(undefined);
    }

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.title_txt}>브랜드 종류</span>
                <button className={style.brand_add_btn} onClick={handleClickBrandAdd}>+추가</button>
            </div>
            <div className={style.list_box}>
                <div className={style.search_box}>
                    <SearchIcon className={style.search_icon}/>
                    <input
                        type={'text'}
                        className={style.search_input}
                        placeholder={'브랜드 검색'}
                        value={startName}
                        onChange={(e)=>setStartName(e.target.value)}
                    />
                </div>
                <div className={style.item_list_box}>
                    {brandQuery.data?.content.map((brand)=> (
                        <BrandItem
                            key={brand.id}
                            brand={brand}
                            selectedBrand={selectedBrand}
                            setSelectedBrand={setSelectedBrand}
                            setOpenBrandAdd={setOpenBrandAdd}
                        />
                    ))}
                </div>
            </div>
            {openBrandAdd && <BrandAdd setOpenBrandAdd={setOpenBrandAdd} />}
            {selectedBrand && <BrandInform brand={selectedBrand}/>}
        </div>
    );
};

export default BrandList;

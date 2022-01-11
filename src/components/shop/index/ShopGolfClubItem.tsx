import style from './shopGolfClubItem.module.css';
import {IGolfClubDto} from "src/apis/GolfClub";
import {useEffect, useState} from "react";

interface IShopGolfClubItemProps {
    item : Partial<IGolfClubDto>
}

const ShopGolfClubItem = ({item} : IShopGolfClubItemProps) : JSX.Element => {
    const [isRowItem, setIsRowItem] = useState(false);
    const [medalUrl, setMedalUrl] = useState('');

    useEffect(()=> {
        item.id! > 2 && setIsRowItem(true);
        item.id === 0 && setMedalUrl('/icon/gold_medal_ico.png');
        item.id === 1 && setMedalUrl('/icon/silver_medal_ico.png');
        item.id === 2 && setMedalUrl('/icon/bronze_medal_ico.png');
    },[])

    return (
        <div className={isRowItem ? style.container_row : style.container_column}>
            <div className={style.img_box}>
                <img src={item.urlList![0]} alt={item.urlList![0]} className={isRowItem ? style.img_row :style.img_column}/>
                {medalUrl && <img src={medalUrl} alt={medalUrl} className={style.medal_icon}/>}
            </div>
            <div className={isRowItem ? style.item_box_row : style.item_box_column}>
                <span className={style.brand_name_txt}>{item.brandName}</span>
                <span className={style.club_name_txt}>{item.name}</span>
                <span className={style.price_txt}>{`${item.cost?.toLocaleString('ko-KR')}원`}</span>
            </div>
        </div>
    );
};

export default ShopGolfClubItem;

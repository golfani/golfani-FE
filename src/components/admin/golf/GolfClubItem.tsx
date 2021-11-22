import style from './golfClubItem.module.css'
import {IGolfClubDto} from "src/apis/GolfClub";

interface IGolfClubItemProps {
    golfClub : IGolfClubDto
}

const GolfClubItem = ({golfClub} : IGolfClubItemProps) : JSX.Element => {

    return (
        <div className={style.container}>
            <span className={style.club_id_txt}>{golfClub.id}</span>
            <span className={style.club_type_txt}>{golfClub.clubType}</span>
            <div className={style.club_box}>
                <img className={style.club_img} src={golfClub?.urlList[0]}/>
                <div>
                    <span className={style.club_gender_txt}>{`[${golfClub.gender}]`}</span>
                    <span className={style.club_name_txt}>{golfClub.name}</span>
                </div>
            </div>
            <span className={style.club_price_txt}>{`${golfClub.cost.toLocaleString('ko-KR')}원`}</span>
            <span className={style.club_info_txt}>정보</span>
        </div>
    );
};

export default GolfClubItem;

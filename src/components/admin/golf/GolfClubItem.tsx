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
            <img className={style.club_img} src={golfClub?.urlList[0]}/>
            <span className={style.club_name_txt}>{golfClub.name}</span>
        </div>
    );
};

export default GolfClubItem;

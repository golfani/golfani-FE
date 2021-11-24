import style from './golfClubList.module.css';
import {getAllGolfClub, getGolfClubByType, IGolfClubDto, TGolfClub} from 'src/apis/GolfClub';
import {useQuery} from "react-query";
import GolfClubItem from "./GolfClubItem";
import {IPages} from "src/domain/Page";

interface  IGolfClubListProps {
    type? : TGolfClub
    brandId : number
}

const GolfClubList = ({type,brandId} : IGolfClubListProps) : JSX.Element => {
    const allGolfClubQuery = useQuery<IPages<IGolfClubDto>>(['allGolfClub',brandId], () => getAllGolfClub(brandId,0,Number.MAX_SAFE_INTEGER));
    const typeGolfClubQuery = useQuery<IPages<IGolfClubDto>>(['golfClub',brandId,type], () => getGolfClubByType(brandId,type!,0,Number.MAX_SAFE_INTEGER),{
        enabled : type !== undefined,
    });

    return (
        <div className={style.container}>
            {type
                ?
                typeGolfClubQuery.data?.content.map((golfClub)=> (
                    <GolfClubItem key={golfClub.id} golfClub={golfClub}/>
                ))
                :
                allGolfClubQuery.data?.content.map((golfClub)=> (
                    <GolfClubItem key={golfClub.id} golfClub={golfClub}/>
                ))
            }
        </div>
    );
};

export default GolfClubList;

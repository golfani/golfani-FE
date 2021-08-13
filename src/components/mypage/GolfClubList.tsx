import style from './golfClubList.module.css';
import GolfClubItem from "./GolfClubItem";

const GolfClubList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <GolfClubItem/>
        </div>
    );
};

export default GolfClubList;
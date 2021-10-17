import style from './userItem.module.css'
import BrandList from "./BrandList";
import GolfClubList from "./GolfClubList";

const UserItem = () : JSX.Element => {
    return (
        <div className={style.container}>
            <BrandList/>
            <GolfClubList/>
        </div>
    );
};

export default UserItem;

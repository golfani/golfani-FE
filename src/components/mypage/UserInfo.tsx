import style from './userInfo.module.css'
import Achievements from "./Achievements";
import GCTI from "./GCTI";

const UserInfo = () : JSX.Element => {
    return (
        <div className={style.container}>
            <Achievements/>
            <GCTI/>
        </div>
    );
};

export default UserInfo;
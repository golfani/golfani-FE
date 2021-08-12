import style from './userProfile.module.css';
import * as faker from "faker";


const UserProfile = () : JSX.Element => {
    return (
        <div className={style.container}>
            <img className={style.img} src={faker.image.avatar()}/>
            <span className={style.user_txt}>{faker.name.firstName()}</span>
        </div>
    );
};

export default UserProfile;
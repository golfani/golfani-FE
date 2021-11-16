import style from './userName.module.css';
import {useRouter} from "next/router";


interface IUserNameProps {
    userName : string
    fontSize? : number
}

const UserName = ({userName,fontSize} : IUserNameProps) : JSX.Element => {
    const router = useRouter();

    const onRouteProfilePage = () => {
        router.push(`/profile/${userName}`);
    }

    const handleClickUserName = () => {
        onRouteProfilePage();
    }

    return (
        <div className={style.container}>
            <span style={{fontSize : fontSize}} className={style.userName_txt} onClick={handleClickUserName}>{userName}</span>
        </div>
    );
};

export default UserName;

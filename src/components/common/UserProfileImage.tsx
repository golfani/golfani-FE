import style from './userProfileImage.module.css';
import {useRouter} from "next/router";

interface IUserProfileImageProps {
    userId : string,
    src : string
    width : number
    height : number
}

const UserName = ({userId,src,width,height} : IUserProfileImageProps) : JSX.Element => {
    const router = useRouter();

    const onRouteProfilePage = () => {
        router.push(`/profile/${userId}`);
    }

    const handleClickUserProfileImage = () => {
        onRouteProfilePage();
    }

    return (
        <img src={src} width={width} height={height} className={style.img} onClick={handleClickUserProfileImage}/>
    );
};

export default UserName;

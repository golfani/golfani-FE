import style from './userProfileImage.module.css';
import {useRouter} from "next/router";

interface IUserProfileImageProps {
    userId : string,
    src : string
    width : number
    height : number
    mr? : number
}

const UserProfileImage = ({userId,src,width,height,mr} : IUserProfileImageProps) : JSX.Element => {
    const router = useRouter();

    const onRouteProfilePage = () => {
        router.push(`/profile/${userId}`);
    }

    const handleClickUserProfileImage = () => {
        onRouteProfilePage();
    }

    return (
        <img
            style={{minWidth : `${width}px`,marginRight : `${mr}px`}}
            src={src}
            width={width}
            height={height}
            className={style.img}
            onClick={handleClickUserProfileImage}
        />
    );
};

export default UserProfileImage;

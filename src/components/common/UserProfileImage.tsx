import style from './userProfileImage.module.css';
import {useRouter} from "next/router";

interface IUserProfileImageProps {
    userId : string,
    src : string
    width : number
    height : number
}

const UserProfileImage = ({userId,src,width,height} : IUserProfileImageProps) : JSX.Element => {
    const router = useRouter();

    const onRouteProfilePage = () => {
        router.push(`/profile/${userId}`);
    }

    const handleClickUserProfileImage = () => {
        onRouteProfilePage();
    }

    return (
        <img
            style={{minWidth : `${width}px`}}
            src={src}
            width={width}
            height={height}
            className={style.img}
            onClick={handleClickUserProfileImage}
        />
    );
};

export default UserProfileImage;

import style from './userProfileImage.module.css';
import {useRouter} from "next/router";
import {getProfileImage} from "src/apis/Member";
import {memo} from "react";

interface IUserProfileImageProps {
    userId: string,
    width: number
    height: number
    mr?: number
}

const UserProfileImage = ({userId, width, height, mr}: IUserProfileImageProps): JSX.Element => {
    const router = useRouter();

    const onRouteProfilePage = () => {
        router.push(`/profile/${userId}`);
    }

    const handleClickUserProfileImage = () => {
        onRouteProfilePage();
    }

    return (
        <img
            style={{minWidth: `${width}px`, marginRight: `${mr}px`}}
            src={getProfileImage(userId, 'MID')}
            width={width}
            height={height}
            className={style.img}
            onClick={handleClickUserProfileImage}
            alt={'userProfile'}
        />
    );
};

export default memo(UserProfileImage);

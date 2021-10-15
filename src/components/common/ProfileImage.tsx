import Image from 'next/image';
import {SyntheticEvent, useState} from "react";
import style from './profileImage.module.css';

interface IProfileImageProps {
    src : string
    width : number
    height : number
}

const ProfileImage = ({src, width, height} : IProfileImageProps) : JSX.Element => {
    const DEFAULT_IMAGE = '/default_user_ico.png';
    const [imgError, setImgError] = useState(false);

    const handleErrorImage = (event : SyntheticEvent<HTMLImageElement, Event>) => {
        setImgError(true);
    }

    return (
        <Image
            src={imgError ? DEFAULT_IMAGE : src}
            width={width}
            height={height}
            onError={handleErrorImage}
            className={style.image}
        />
    );
};

export default ProfileImage;

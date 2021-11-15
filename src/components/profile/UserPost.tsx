import style from './userPost.module.css';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import CreateIcon from '@material-ui/icons/Create';
import UserFeed from "./UserFeed";
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import {useState} from "react";

type TUserMenu = 'FEED' | 'BOARD' | 'ITEM';

const UserPost = ({member} : IProfileMemberProps) : JSX.Element => {
    const [userMenu, setUserMenu] = useState<TUserMenu>('FEED');

    const onChangeMenu = (menu : TUserMenu) => {
        setUserMenu(menu);
    }

    const handleClickUserMenu = (menu : TUserMenu) => {
        onChangeMenu(menu);
    }

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <div className={userMenu === 'FEED'? style.title_select_active : style.title_select} onClick={()=>handleClickUserMenu('FEED')}>
                    <PhotoCameraIcon fontSize={'inherit'} className={style.title_icon}/>
                    <span className={style.title_txt}>피드</span>
                </div>
                <div className={userMenu === 'BOARD'? style.title_select_active : style.title_select} onClick={()=>handleClickUserMenu('BOARD')}>
                    <CreateIcon fontSize={'inherit'} className={style.title_icon}/>
                    <span className={style.title_txt}>게시글</span>
                </div>
                <div className={userMenu === 'ITEM'? style.title_select_active : style.title_select} onClick={()=>handleClickUserMenu('ITEM')}>
                    <SportsGolfIcon fontSize={'inherit'} className={style.title_icon}/>
                    <span className={style.title_txt}>아이템</span>
                </div>
            </div>
            {userMenu === 'FEED' && <UserFeed member={member}/>}
        </div>
    );
};

export default UserPost;

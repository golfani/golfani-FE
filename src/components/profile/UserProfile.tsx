import style from './userProfile.module.css';
import {getProfileImage, registerProfileImage} from "src/apis/Member";
import {getCookie} from "src/utils/cookieUtil";
import {ChangeEvent, useRef, useState} from "react";
import {dataURLtoFile} from "src/utils/fileUtil";
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import MessageSendModal from "src/components/modals/MessageSendModal";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {useRouter} from "next/router";

const UserProfile = ({member}: IProfileMemberProps): JSX.Element => {
    const userId = getCookie('userId');
    const hasRole = userId === member.userId;
    const [openSendMsg, setOpenSendMsg] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onCloseSendMsg = () => {
        setOpenSendMsg(false);
    }

    const handleClickMsgButton = () => {
        setOpenSendMsg((openSendMsg) => !openSendMsg);
    }

    const handleChangeImage = (event: ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        const file: File = input.files[0];
        const fileUrl = URL.createObjectURL(file);
        let canvas = window.document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let canvasImage = new Image();
        canvasImage.src = fileUrl;
        const maxWidth = 600;
        const maxHeight = 600;

        canvasImage.onload = async () => {
            let width = canvasImage.width;
            let height = canvasImage.height;
            if (width > height) {
                if (width > maxWidth) {
                    height = height * maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = width * maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(canvasImage, 0, 0, width, height);
            const resizeImageUrl = canvas.toDataURL(file.type, 0.75);
            const resizeImageFile = dataURLtoFile(resizeImageUrl, file.name);

            try {
                const response = await registerProfileImage(resizeImageFile);
                router.reload();
            } catch (e) {
            }
        }
    }

    handleClickRefOutSide(targetRef, onCloseSendMsg);

    return (
        <div className={style.container}>
            <div className={style.profile_box}>
                <img src={getProfileImage(member.userId, "HIGH")}
                     alt={'profile'}
                     width={150}
                     height={150}
                     className={style.img}
                />
                {hasRole && <label htmlFor={'input'} className={style.profile_img_btn}>프로필 사진 변경</label>}
                <input id={'input'} type='file' accept={'image/jpeg, image/png'} className={style.hidden}
                       onChange={handleChangeImage}/>
                <span className={style.user_txt}>{member.userId}</span>
            </div>
            <div className={style.user_info_box}>
                {/*<GCTI/>*/}
                {/*<Achievements/>*/}
            </div>
            <div className={style.user_menu_box} ref={targetRef}>
                {hasRole || <button className={style.msg_btn} onClick={handleClickMsgButton}>메세지 보내기</button>}
                {openSendMsg && <MessageSendModal member={member} setModalOpen={setOpenSendMsg}/>}
            </div>
        </div>
    );
};

export default UserProfile;

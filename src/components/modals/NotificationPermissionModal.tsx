import style from './notificationPermissionModal.module.css';
import {useEffect} from "react";

interface INotificationPermissionModalProps {
    setOpenModal : (state : boolean) => void
}

const NotificationPermissionModal = (props : INotificationPermissionModalProps) : JSX.Element => {

    const onCloseModal = () => {
        props.setOpenModal(false);
    }

    // 브라우저가 Notification API 를 지원하는지 체크
    const checkSupportNotification = () : boolean => {
        return 'Notification' in window;
    }

    // 브라우저가 Notification.requestPermission()의 프로미스 버전을 지원하는지 확인
    const checkNotificationPromise = () : boolean => {
        try {
            Notification.requestPermission().then()
        }
        catch (e) {
            return false;
        }
        return true;
    }

    // notification 알림 권환 요청
    const requestNotificationPermission = () => {
        if(checkSupportNotification()) {
            if(checkNotificationPromise()) {
                Notification.requestPermission()
                    .then((permission)=> {
                        if(permission === 'granted') {
                            onCloseModal();
                        }
                    })
            }
            else {
                Notification.requestPermission((permission) => {
                    if(permission === 'granted') {
                        onCloseModal();
                    }
                });
            }
        }
        else {
            alert('원활한 서비스 이용을 위해 Chrome, Safari, Edge 브라우저를 이용해 주세요.');
        }
    }

    useEffect(()=> {
        requestNotificationPermission();
    },[]);

    return (
        <div className={style.container}>
            <div className={style.modal_box}>
                <span className={style.permission_txt}>골파니 서비스를 이용하기 위해서<br/>알람 권한을 허용해 주세요</span>
            </div>
        </div>
    );
};

export default NotificationPermissionModal;

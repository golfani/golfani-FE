import ShopStoreList from "./ShopStoreList";
import style from './shopSearch.module.css'
import {getCookie} from "src/utils/cookieUtil";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getMember} from "src/apis/Member";
import FavoriteRegionModal from "src/components/modals/shop/FavoriteRegionModal";
import {useRouter} from "next/router";

const ShopSearch = (): JSX.Element => {
    const userId = getCookie('userId');
    const [regCode, setRegCode] = useState<number | null>(null);
    const [openFavoriteRegionModal, setOpenFavoriteRegionModal] = useState(false);
    const memberQuery = useQuery(['member', userId], () => getMember(userId), {
        enabled: userId != undefined,
        staleTime: 1000 * 60 * 10
    });
    const router = useRouter();

    useEffect(() => {
        if (memberQuery.data) {
            if (memberQuery.data.regCode) {
                setRegCode(memberQuery.data.regCode);
                setOpenFavoriteRegionModal(false);
            } else {
                setOpenFavoriteRegionModal(true);
            }
        }
    }, [memberQuery.data]);

    const onSetOpenModal = () => {
        setOpenFavoriteRegionModal(true);
    }

    const handleClickLoginButton = () => {
        router.push('/login');
    }

    return (
        <div className={style.container}>
            <span className={style.title_txt}>지역기반 검색 서비스</span>
            <button className={style.change_btn} onClick={onSetOpenModal}>지역 변경</button>
            {userId ? regCode ? <ShopStoreList regCode={regCode}/>
                :
                <div className={style.no_login_box}>
                    <span className={style.no_login_txt}>서비스 사용을 위해 관심지역을 설정해 주세요 😊</span>
                    <button className={style.login_btn} onClick={onSetOpenModal}>설정하기</button>
                </div>
                :
                <div className={style.no_login_box}>
                    <span className={style.no_login_txt}>해당 서비스는 GOLFANI 회원에게 제공되는 전용 서비스입니다 😊</span>
                    <button className={style.login_btn} onClick={handleClickLoginButton}>로그인</button>
                </div>
            }
            {openFavoriteRegionModal && <FavoriteRegionModal setOpenModal={setOpenFavoriteRegionModal}/>}
        </div>
    );
};

export default ShopSearch;

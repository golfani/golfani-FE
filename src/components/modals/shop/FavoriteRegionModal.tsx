import style from './favoriteRegionModal.module.css';
import {useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import {getRegionList, IRegionDto} from "src/apis/Region";
import {getMember, modifyRegCode} from "src/apis/Member";
import {getCookie} from "src/utils/cookieUtil";

interface IFavoriteRegionModal {
    setOpenModal: (state: boolean) => void
}

const FavoriteRegionModal = (props: IFavoriteRegionModal): JSX.Element => {
    const [highLevelDistrict, setHighLevelDistrict] = useState("");
    const [lowLevelDistrict, setLowLevelDistrict] = useState("");
    const [regCode, setRegCode] = useState<number>();
    const highRegionQuery = useQuery<IRegionDto[]>('highRegion', () => getRegionList({
        regCode: 0,
        region1: '',
        region2: '',
        region3: ''
    }));
    const lowRegionQuery = useQuery<IRegionDto[]>(['lowRegion', highLevelDistrict], () => getRegionList({
        regCode: 0,
        region1: highLevelDistrict,
        region2: '',
        region3: '',
    }), {
        enabled: !!highLevelDistrict
    });
    const userId = getCookie('userId');
    const queryClient = useQueryClient();

    const handleClickHighDistrict = (district: string) => {
        setHighLevelDistrict(district);
    }

    const handleClickLowDistrict = (region: IRegionDto) => {
        setLowLevelDistrict(region.region2);
        setRegCode(region.regCode);
    }

    const handleClickChange = () => {
        setHighLevelDistrict('');
        setLowLevelDistrict('');
    }

    const fetchRegion = async () => {
        try {
            const member = await getMember(userId);
            member.regCode = regCode!;
            const response = await modifyRegCode(member);
            await queryClient.invalidateQueries(['member', userId]);
            onCloseModal();
        } catch (e) {
            console.log(e);
        }
    }

    const handleClickSetRegion = async () => {
        if (lowLevelDistrict) {
            await fetchRegion();
        } else {
            alert('관심 지역을 선택해 주세요');
        }
    }

    const onCloseModal = () => {
        props.setOpenModal(false);
    }

    return (
        <div className={'modal_container'}>
            <div className={style.modal_box}>
                <div className={style.title_box}>
                    <button className={style.prev_btn} onClick={onCloseModal}>다음에</button>
                    <span className={style.title_txt}>관심지역 설정</span>
                    <button className={style.set_btn} onClick={handleClickSetRegion}>설정</button>
                </div>
                <div className={style.select_container}>
                    {highLevelDistrict
                        ?
                        null
                        :
                        <div className={style.district_box}>
                            {highRegionQuery.data?.map((region, idx) => (
                                <button key={idx} className={style.district_txt}
                                        onClick={() => handleClickHighDistrict(region.region1)}>{region.region1}</button>
                            ))}
                        </div>
                    }
                    {highLevelDistrict && !lowLevelDistrict &&
                    <div className={style.district_box}>
                        {lowRegionQuery.data?.map((region, idx) => (
                            <button key={idx} className={style.district_txt}
                                    onClick={() => handleClickLowDistrict(region)}>{region.region2}</button>
                        ))}
                    </div>
                    }
                </div>
                <div className={style.select_box}>
                    <span className={style.region_info_txt}>관심지역</span>
                    <span className={style.region_txt}>{highLevelDistrict}</span>
                    <span className={style.region_txt}>{lowLevelDistrict}</span>
                    <button className={style.change_btn} onClick={handleClickChange}>변경</button>
                </div>
                <span className={style.info_txt}>*관심지역 설정시 스토어 페이지에서 해당지역 인근 매장을 보여줍니다.</span>
            </div>
        </div>
    );
};

export default FavoriteRegionModal;

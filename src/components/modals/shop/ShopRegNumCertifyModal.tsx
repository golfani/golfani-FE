import style from './shopRegNumCertifyModal.module.css';
import {useState} from "react";
import {IBusinessData, IBusinesses} from "src/domain/Shop";
import {validateRegistrationNumber} from "src/apis/Shop";
import useShopRegister from "src/store/modules/shopRegister/shopRegisterHook";

interface IShopRegNumCertifyModalProps {
    setModalOpen: (state: boolean) => void;
}

const ShopRegNumCertifyModal = (props: IShopRegNumCertifyModalProps): JSX.Element => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [regNum, setRegNum] = useState('');
    const shopRegister = useShopRegister();

    const onCloseModal = () => {
        props.setModalOpen(false);
    }

    const onFetchValidate = async (data: IBusinesses) => {
        const businessesData: IBusinessData = {
            businesses: [
                data
            ]
        }

        try {
            const response = await validateRegistrationNumber(businessesData);
            if (response.data[0].valid === '01') {
                shopRegister.onSetRegistrationNumber(regNum);
                onCloseModal();
            } else {
                alert('사업자 인증에 실패하였습니다.');
            }
        } catch (e) {
            alert('사업자 인증에 실패하였습니다.');
        }
    }

    const handleClickOkButton = async () => {
        if (name && date && regNum) {
            const data: IBusinesses = {
                b_no: regNum,
                start_dt: date,
                p_nm: name
            }
            await onFetchValidate(data);
        } else {
            alert('정보를 모두 입력해 주세요');
        }
    }

    const handleClickCancelButton = () => {
        onCloseModal();
    }

    return (
        <div className={style.container}>
            <div className={style.modal_box}>
                <div className={style.title_box}>
                    <button className={style.action_btn} onClick={handleClickCancelButton}>취소</button>
                    <span className={style.title_txt}>사업자 등록정보 진위확인</span>
                    <button className={style.action_btn} onClick={handleClickOkButton}>확인</button>
                </div>
                <div className={style.input_box}>
                    <span className={style.input_txt}>대표자 성명</span>
                    <input className={style.input} value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={style.input_box}>
                    <span className={style.input_txt}>개업일자</span>
                    <input
                        type={'number'}
                        className={style.input}
                        placeholder={'YYYYMMDD형식 예) 20210101'}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className={style.input_box}>
                    <span className={style.input_txt}>사업자등록번호</span>
                    <input
                        type={'number'}
                        className={style.input}
                        placeholder={"'-'기호 없이 입력"}
                        value={regNum}
                        onChange={(e) => setRegNum(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopRegNumCertifyModal;

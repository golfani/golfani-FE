import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {
    initState,
    setDescription,
    setShopName,
    setAddress,
    setSubAddress,
    setContactFirst,
    setContactMiddle,
    setContactLast,
    setStep,
    setRegionId,
    addImg,
    deleteImg,
    IShopRegisterImg,
    addCertifyImg,
    deleteCertifyImg,
    setRegistrationNumber
} from './shopRegister';
import {SHOP_REGISTER_STATUS} from "src/domain/Shop";

const useShopRegister = () => {
    const step : SHOP_REGISTER_STATUS = useSelector((state : RootState) => state.shopRegister.step);
    const img = useSelector((state : RootState) => state.shopRegister.img);
    const shopName = useSelector((state : RootState) => state.shopRegister.inputs.shopName);
    const address = useSelector((state : RootState) => state.shopRegister.inputs.address);
    const subAddress = useSelector((state : RootState) => state.shopRegister.inputs.subAddress);
    const contactFirst = useSelector((state : RootState) => state.shopRegister.inputs.contactFirst);
    const contactMiddle = useSelector((state : RootState) => state.shopRegister.inputs.contactMiddle);
    const contactLast = useSelector((state : RootState) => state.shopRegister.inputs.contactLast);
    const description = useSelector((state : RootState) => state.shopRegister.inputs.description);
    const certifyImg = useSelector((state : RootState) => state.shopRegister.certifyImg);
    const registrationNumber = useSelector((state : RootState) => state.shopRegister.inputs.registrationNumber);
    const regionId = useSelector((state : RootState) => state.shopRegister.inputs.regionId);

    const dispatch = useDispatch();

    const onInitState = () => {
        dispatch(initState());
    }

    const onSetShopName = (shopName : string) => {
        dispatch(setShopName(shopName));
    }

    const onSetDescription = (description : string) => {
        dispatch(setDescription(description));
    }

    const onSetAddress = (address : string) => {
        dispatch(setAddress(address));
    }

    const onSetSubAddress = (subAddress : string) => {
        dispatch(setSubAddress(subAddress));
    }

    const onSetContactFirst = (contact : string) => {
        dispatch(setContactFirst(contact));
    }

    const onSetContactMiddle = (contact : string) => {
        dispatch(setContactMiddle(contact));
    }

    const onSetContactLast = (contact : string) => {
        dispatch(setContactLast(contact));
    }

    const onSetStep = (step : SHOP_REGISTER_STATUS) => {
        dispatch(setStep(step));
    }

    const onSetRegionId = (regionId : number) => {
        dispatch(setRegionId(regionId));
    }

    const onAddImg = (img : IShopRegisterImg) => {
        dispatch(addImg(img));
    }

    const onDeleteImg = (index : number) => {
        dispatch(deleteImg(index));
    }

    const onAddCertifyImg = (img : IShopRegisterImg) => {
        dispatch(addCertifyImg(img));
    }

    const onDeleteCertifyImg = (index : number) => {
        dispatch(deleteCertifyImg(index));
    }

    const onInitRegistrationNumber = () => {
        dispatch(setRegistrationNumber(''));
    }

    const onSetRegistrationNumber = (registrationNumber : string) => {
        dispatch(setRegistrationNumber(registrationNumber));
    }

    const checkValidInputs = () => {
        return !!(shopName && address && registrationNumber && contactFirst && contactMiddle && contactLast && description && location);
    }

    return {
        step,
        img,
        shopName,
        description,
        address,
        subAddress,
        contactFirst,
        contactMiddle,
        contactLast,
        certifyImg,
        registrationNumber,
        regionId,
        onInitState,
        onSetDescription,
        onSetShopName,
        onSetStep,
        checkValidInputs,
        onDeleteImg,
        onAddImg,
        onSetAddress,
        onSetSubAddress,
        onSetContactFirst,
        onSetContactMiddle,
        onSetContactLast,
        onSetRegionId,
        onAddCertifyImg,
        onDeleteCertifyImg,
        onSetRegistrationNumber,
        onInitRegistrationNumber
    }
}

export default useShopRegister;

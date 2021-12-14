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
    addImg,
    deleteImg,
    IShopRegisterImg
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

    const onAddImg = (img : IShopRegisterImg) => {
        dispatch(addImg(img));
    }

    const onDeleteImg = (index : number) => {
        dispatch(deleteImg(index));
    }

    const checkValidInputs = () => {
        return !!(shopName && address && contactFirst && contactMiddle && contactLast && description && location);
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
        onSetContactLast
    }
}

export default useShopRegister;
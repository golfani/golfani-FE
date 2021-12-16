import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SHOP_REGISTER_STATUS} from "src/domain/Shop";

export interface IShopRegisterImg {
    imgFiles : File
    imgUrls : string
}

export interface IShopRegisterInputs {
    shopName : string
    description : string
    address : string
    subAddress : string
    contactFirst : string
    contactMiddle : string
    contactLast : string
    registrationNumber : string
}

interface IShopRegisterState {
    step : SHOP_REGISTER_STATUS
    img : IShopRegisterImg[]
    inputs : IShopRegisterInputs
    certifyImg : IShopRegisterImg[]
}

const initialState : IShopRegisterState = {
    step : SHOP_REGISTER_STATUS.INFO,
    img : [],
    inputs : {
        shopName : '',
        description : '',
        address : '',
        subAddress : '',
        contactFirst : '',
        contactMiddle : '',
        contactLast : '',
        registrationNumber : '',
    },
    certifyImg : []
}

export const shopRegisterSlice = createSlice({
    name : 'shopRegister',
    initialState : initialState,
    reducers : {
        initState(state : IShopRegisterState) {
            state.step = SHOP_REGISTER_STATUS.INFO;
            state.img = [];
            state.inputs = {
                shopName : '',
                description : '',
                address : '',
                subAddress : '',
                contactFirst : '',
                contactMiddle : '',
                contactLast : '',
                registrationNumber : '',
            };
            state.certifyImg = [];
        },
        setShopName(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.shopName = action.payload;
        },
        setAddress(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.address = action.payload;
        },
        setSubAddress(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.subAddress = action.payload;
        },
        setDescription(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.description = action.payload;
        },
        setContactFirst(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.contactFirst = action.payload;
        },
        setContactMiddle(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.contactMiddle = action.payload;
        },
        setContactLast(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.contactLast = action.payload;
        },
        setStep(state : IShopRegisterState, action : PayloadAction<SHOP_REGISTER_STATUS>) {
            state.step = action.payload;
        },
        setRegistrationNumber(state : IShopRegisterState, action : PayloadAction<string>) {
            state.inputs.registrationNumber = action.payload;
        },
        addImg(state : IShopRegisterState, action : PayloadAction<IShopRegisterImg>) {
            state.img.push(action.payload);
        },
        deleteImg (state : IShopRegisterState, action : PayloadAction<number>) {
            state.img = state.img.filter((item,index) => index !== action.payload);
        },
        addCertifyImg(state : IShopRegisterState, action : PayloadAction<IShopRegisterImg>) {
            state.certifyImg.push(action.payload);
        },
        deleteCertifyImg (state : IShopRegisterState, action : PayloadAction<number>) {
            state.certifyImg = state.certifyImg.filter((item,index) => index !== action.payload);
        }
    }
})

export default shopRegisterSlice.reducer;
export const {initState,setDescription,setAddress,setSubAddress,setContactFirst,setContactMiddle,setContactLast,setShopName,setStep,addImg,deleteImg,addCertifyImg,deleteCertifyImg,setRegistrationNumber} = shopRegisterSlice.actions;

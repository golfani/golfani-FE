export const SHOP_REGISTER_STATUS = {
    INFO : 'INFO',
    IMAGE : 'IMAGE',
    CERTIFY : 'CERTIFY'
} as const;

export type SHOP_REGISTER_STATUS = typeof SHOP_REGISTER_STATUS[keyof typeof SHOP_REGISTER_STATUS];

export interface IBusinesses {
    b_no : string
    start_dt : string
    p_nm : string
}

export interface IBusinessData {
    businesses : IBusinesses[]
}

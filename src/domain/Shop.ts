export const SHOP_REGISTER_STATUS = {
    INFO : 'INFO',
    IMAGE : 'IMAGE',
} as const;

export type SHOP_REGISTER_STATUS = typeof SHOP_REGISTER_STATUS[keyof typeof SHOP_REGISTER_STATUS];


export enum SystemTextIds {
    TXT_TITLE = 'TXT_TITLE',

    NAV_BTN_HOME = 'NAV_BTN_HOME',
    NAV_BTN_CART = 'NAV_BTN_CART',
    NAV_BTN_ORDER = 'NAV_BTN_ORDER',
    NAV_BTN_USER = 'NAV_BTN_USER',
    NAV_BTN_VERIFY = 'NAV_BTN_VERIFY',

    BTN_ADD_TO_CART = 'BTN_ADD_TO_CART',
    BTN_CHECKOUT = `BTN_CHECKOUT`,
    
    TXT_CART_EMPTY = 'TXT_CART_EMPTY',
    TXT_ORDER_EMPTY = 'TXT_ORDER_EMPTY',
    
    TXT_ORDER_STATUS_PROCESSING = 'TXT_ORDER_STATUS_PROCESSING',
    TXT_ORDER_STATUS_RECEIVED = 'TXT_ORDER_STATUS_RECEIVED',
    TXT_ORDER_STATUS_CANCELLED = 'TXT_ORDER_STATUS_CANCELLED',

    TXT_PRODUCT_STOCK = 'TXT_PRODUCT_STOCK',
    TEXT_PRODUCT_STOCK_OUT = 'TEXT_PRODUCT_STOCK_OUT',
    
}


export const DefaultSystemTexts: Record<SystemTextIds, string> = {
    [SystemTextIds.TXT_TITLE]: "Web Order System",
    [SystemTextIds.NAV_BTN_HOME]: "Home",
    [SystemTextIds.NAV_BTN_CART]: "Cart",
    [SystemTextIds.NAV_BTN_ORDER]: "Order",
    [SystemTextIds.NAV_BTN_USER]: "User",
    [SystemTextIds.NAV_BTN_VERIFY]: "Verify",

    [SystemTextIds.BTN_ADD_TO_CART]: "カートに追加",
    [SystemTextIds.BTN_CHECKOUT]: "オーダーを確定",
    [SystemTextIds.TXT_CART_EMPTY]: "カートは空です",
    [SystemTextIds.TXT_ORDER_EMPTY]: "オーダーはありません",
    [SystemTextIds.TXT_ORDER_STATUS_PROCESSING]: "準備中",
    [SystemTextIds.TXT_ORDER_STATUS_RECEIVED]: "受け取り済み",
    [SystemTextIds.TXT_ORDER_STATUS_CANCELLED]: "キャンセル済み",
    [SystemTextIds.TXT_PRODUCT_STOCK]: "在庫数",
    [SystemTextIds.TEXT_PRODUCT_STOCK_OUT]: "在庫切れ",
}
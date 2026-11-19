import { db } from "../db";
import { models } from "./type";


export function get(storeId: string, start?: string): Promise<models["orderMin"][]> {
    return db.order.findMany({
        where: {
            storeId,
            isCanceled: false,
            isReceived: false,
            id: {
                gt: start
            }
        },
        orderBy: {
            requestedAt: "asc"
        },
        select: {
            id: true,
            index: true,
            isCanceled: true,
            isReceived: true,
            isReady: true,
            requestedAt: true,
            
            cartItems: {
                select: {
                    id: true,
                    count: true,
                    product: {
                        select: {
                            name: true,
                            price: true,
                            langMaps: {
                                select: {
                                    langId: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}


export function get_userVerifyKey(storeId: string, userVerifyKey: string): Promise<models["orderMin"][] | null> {
    const now = new Date();

    
    return db.userVerifyKey.findUnique({
        where: {
            key: userVerifyKey,
            expiresAt: {
                gte: now
            }
        },
        select: {
            user: {
                select: {
                    orders: {
                        where: {
                            storeId,
                            isCanceled: false,
                            isReceived: false
                        },
                        select: {
                            id: true,
                            index: true,
                            isCanceled: true,
                            isReceived: true,
                            isReady: true,
                            requestedAt: true,
                            
                            cartItems: {
                                select: {
                                    id: true,
                                    count: true,
                                    product: {
                                        select: {
                                            name: true,
                                            price: true,
                                            langMaps: {
                                                select: {
                                                    langId: true,
                                                    name: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }).then(res => res?.user?.orders ?? null)
}
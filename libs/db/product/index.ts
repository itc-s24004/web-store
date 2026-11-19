import { db } from "../db";
import { models } from "./type";



export async function getTop(): Promise<models["model"][]> {
    return db.product.findMany({
        select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isStockAccurate: true,
        img: {
            select: {
                url: true
            }
        },
        langMaps: {
            select: {
                name: true,
                description: true,
                langId: true
            }
        }
        }
    })
}

export async function add(storeId: string, name: string, description: string, price: number): Promise<models["edit"]> {
    return db.product.create({
        data: {
            storeId,
            name,
            description,
            price
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            isStockAccurate: true,
            stock: true,

            img: {
                select: {
                    id: true,
                    url: true
                }
            },
            
            langMaps: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    langId: true
                }
            }}
    })
}

export async function getDetail(id: string): Promise<models["detail"] | null> {
    return db.product.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            
            store: {
                select: {
                    id: true,
                    name: true,
                    langMaps: {
                        select: {
                            langId: true,
                            name: true
                        }
                    }
                }
            },
            img: true,
            langMaps: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    langId: true
                }
            }
        }
    })
}


export async function remove(id: string) {
    return db.product.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}


export async function update(id: string, data: models["update"]) {
    return db.product.update({
        where: {
            id
        },
        data,
        select: {
            id: true
        }
    })
}

export async function getEdit(storeId: string): Promise<models["edit"][]> {
    return db.product.findMany({
        where: {
            storeId
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            isStockAccurate: true,
            stock: true,

            img: {
                select: {
                    id: true,
                    url: true
                }
            },
            
            langMaps: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    langId: true
                }
            }
        }
    })
}





export * as store from "./store"


export type { models } from "./type";
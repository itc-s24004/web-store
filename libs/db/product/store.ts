import { db } from "../db";
import { models } from "./type";

export function update(storeId: string, productId: string, data: models["update"]) {
    return db.product.update({
        where: {
            id: productId,
            storeId
        },
        data,
        select: {
            id: true
        }
    })
}


export function remove(storeId: string, productId: string) {
    return db.product.delete({
        where: {
            id: productId,
            storeId
        },
        select: {
            id: true
        }
    })
}


export const model = {
    get(storeId: string): Promise<models["model"][]> {
        return db.product.findMany({
            where: {
                storeId
            },
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
    },
    async getCache(storeId: string): Promise<models["model"][]> {
        "use cache";

        return model.get(storeId);
    }
}

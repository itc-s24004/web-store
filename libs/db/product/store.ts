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
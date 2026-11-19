import { api_client_req } from "../client";
import { AppAPI_cartItem } from "./route";

export function add(storeId: string, productId: string, quantity: number) {
    return api_client_req<AppAPI_cartItem, "POST">("/api/app/cartItem", "POST", undefined, {
        storeId,
        productId,
        quantity
    })
}

export * from "./[cartItemId]/client"
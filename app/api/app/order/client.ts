import { api_client_req } from "../client";
import { AppAPI_order } from "./route";

export function add(storeId: string, cartItemIds: string[]) {
    return api_client_req<AppAPI_order, "POST">("/api/app/order", "POST", undefined, {
        storeId,
        cartItemIds
    })
}

export * from "./[orderId]/client"
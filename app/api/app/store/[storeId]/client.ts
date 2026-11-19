import { api_client_req } from "../../client";
import { AppAPI_store__storeId } from "./route";

export function update(storeId: string, data: AppAPI_store__storeId["PATCH"]["req"]["body"]) {
    return api_client_req<AppAPI_store__storeId, "PATCH">(`/api/app/store/${storeId}`, "PATCH", undefined, data);

}



export * as order from "./order/client"
export * as product from "./product/client"
export * as productGroup from "./productGroup/client"
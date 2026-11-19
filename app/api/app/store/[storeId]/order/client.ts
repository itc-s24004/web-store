import { api_client_req } from "../../../client";
import { AppAPI_store__storeId__order } from "./route";

export function get(storeId: string, filter: AppAPI_store__storeId__order["GET"]["req"]["params"]) {
    return api_client_req<AppAPI_store__storeId__order, "GET">(`/api/app/store/${storeId}/order`, "GET", filter, undefined);

}

export * from "./[orderId]/client"
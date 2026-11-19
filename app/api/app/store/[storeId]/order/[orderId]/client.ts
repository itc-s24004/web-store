import { api_client_req } from "@/app/api/app/client";
import { AppAPI_store__storeId__order__orderId } from "./route";

export function update(storeId: string, orderId: string, data: AppAPI_store__storeId__order__orderId["PATCH"]["req"]["body"]) {
    return api_client_req<AppAPI_store__storeId__order__orderId, "PATCH">(`/api/app/store/${storeId}/order/${orderId}`, "PATCH", undefined, data);
}
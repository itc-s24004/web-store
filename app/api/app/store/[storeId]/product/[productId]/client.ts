import { api_client_req } from "@/app/api/app/client";
import { AppAPI_store__storeId__product__productId } from "./route";

export function update(storeId: string, productId: string, data: AppAPI_store__storeId__product__productId["PATCH"]["req"]["body"]) {
    return api_client_req<AppAPI_store__storeId__product__productId, "PATCH">(`/api/app/store/${storeId}/product/${productId}`, "PATCH", undefined, data);

}
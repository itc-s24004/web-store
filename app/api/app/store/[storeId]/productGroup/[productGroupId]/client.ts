import { api_client_req } from "@/app/api/app/client";
import { AppAPI_store__storeId__productGroup__productGroupId } from "./route";

export async function update(storeId: string, id: string, data: AppAPI_store__storeId__productGroup__productGroupId["PATCH"]["req"]["body"]) {
    return api_client_req<AppAPI_store__storeId__productGroup__productGroupId, "PATCH">(`/app/store/${storeId}/productGroup/${id}`, "PATCH", undefined, data);

}


export async function remove(storeId: string, id: string) {
    return api_client_req<AppAPI_store__storeId__productGroup__productGroupId, "DELETE">(`/app/store/${storeId}/productGroup/${id}`, "DELETE", undefined, undefined);

}
import { api_client_req } from "../../../client";
import { AppAPI_store__storeId__productGroup } from "./route";

export async function add(storeId: string, data: AppAPI_store__storeId__productGroup["POST"]["req"]["body"]) {
    return api_client_req<AppAPI_store__storeId__productGroup, "POST">(`/app/store/${storeId}/productGroup`, "POST", undefined, data);

}

export * from "./[productGroupId]/client"
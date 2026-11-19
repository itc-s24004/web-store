import { api_client_req } from "../client";
import { AppAPI_store } from "./route";

export function add(storeId: string, data: AppAPI_store["POST"]["req"]["body"]) {
    return api_client_req<AppAPI_store, "POST">(`/app/store/${storeId}`, "POST", undefined, data);

}


export * from "./[storeId]/client"
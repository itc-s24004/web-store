import { api_client_req } from "../../../client";
import { AppAPI_store__storeId__staff } from "./route";

export function add(storeId: string, email: string) {
    return api_client_req<AppAPI_store__storeId__staff, "POST">(`/api/app/store/${storeId}/staff`, "POST", undefined, {
        email
    })
}
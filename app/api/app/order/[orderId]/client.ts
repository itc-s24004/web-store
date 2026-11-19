import { api_client_req } from "../../client";
import { AppAPI_order__orderId } from "./route";

export function cancel(orderId: string) {
    return api_client_req<AppAPI_order__orderId, "DELETE">(`/api/app/order/${orderId}`, "DELETE", undefined, undefined);
}
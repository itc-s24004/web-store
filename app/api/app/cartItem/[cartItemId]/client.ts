import { api_client_req } from "../../client";
import { AppAPI_cartItem__cartItemId } from "./route";

export function update(cartItemId: string, quantity: number) {
    return api_client_req<AppAPI_cartItem__cartItemId, "PATCH">(`/api/app/cartItem/${cartItemId}`, "PATCH", undefined, {
        quantity
    })
}

export function remove(cartItemId: string) {
    return api_client_req<AppAPI_cartItem__cartItemId, "DELETE">(`/api/app/cartItem/${cartItemId}`, "DELETE", undefined, undefined);
}
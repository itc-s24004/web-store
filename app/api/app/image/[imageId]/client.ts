import { api_client_req } from "../../client";
import { AppAPI_image } from "../route";

export function remove(imageId: string) {
    return api_client_req<AppAPI_image, "DELETE">(`/api/app/image/${imageId}`, "DELETE", undefined, undefined);
}
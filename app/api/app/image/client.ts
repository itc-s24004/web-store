import { api_client_req } from "../client";
import { AppAPI_image } from "./route";

export function add(img: File) {
    const formData = new FormData();
    formData.append("file", img);

    return api_client_req<AppAPI_image, "POST">("/api/app/image", "POST", undefined, formData);
}

export * from "./[imageId]/client"
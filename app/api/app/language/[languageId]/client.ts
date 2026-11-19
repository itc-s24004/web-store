import { api_client_req } from "@/app/api/app/client";
import type { AppAPI_language__languageId } from "./route";

const languageUrl = (id: string) =>
	`/api/app/staff/admin/language/${encodeURIComponent(id)}`;



export function update(id: string, name: string) {
    return api_client_req<AppAPI_language__languageId, "PATCH">(
        languageUrl(id),
        "PATCH",
        undefined,
        {
            name
        },
    )
}

export function remove(id: string) {
    return api_client_req<AppAPI_language__languageId, "DELETE">(
        languageUrl(id),
        "DELETE",
        undefined,
        undefined,
    )
}
import { api_client_req } from "@/app/api/app/client";
import { AppAPI_language } from "./route";

const path = "/api/app/staff/admin/language";


export function add(name: string) {
    return api_client_req<AppAPI_language, "POST">(
        path,
        "POST",
        undefined,
        {
            name
        }
    )
}

export * from "./[languageId]/client"

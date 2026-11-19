import { api_url_param_gen, app_api_doc, app_api_map, app_api_response } from "@/app/api/app/api";
import { NextRequest, NextResponse } from "next/server";

export function API_Route<map extends app_api_map, route extends AppAPI_Route<map> = AppAPI_Route<map>>(
    handlers: route
) {
    return handlers;
}

export type AppAPI_Route<map extends app_api_map, key extends keyof map = keyof map> = {
    [K in key]: map[K] extends app_api_doc ? (req: NextRequest, p: map[K]["req"]["pathParams"] extends string ? api_url_param_gen<map[K]["req"]["pathParams"]> : never) => Promise<NextResponse<map[K]["res"]>> : never
}

const test: AppAPI_Route<{
    GET: {
        req: {
            pathParams: "storeId"
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}> = {
    GET: async (req: NextRequest, p) => {
        return NextResponse.json({
            success: true,
            data: undefined
        })
    }
}

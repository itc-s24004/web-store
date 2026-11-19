import { AppDB, AppDB_Types } from "@/libs/db";
import { app_api_map_gen, app_api_response } from "../../../api";
import { API_Route } from "@/libs/api/route";
import { AppAPI } from "@/libs/api";
import { NextResponse } from "next/server";

export type AppAPI_store__storeId__order = app_api_map_gen<{
    GET: {
        req: {
            pathParams: "storeId",
            params: {
                start?: string,
                userVerifyKey?: string
            },
            body: undefined
        },
        res: app_api_response<AppDB_Types["order"]["orderMin"][]>
    }
}>



export const {
    GET
} = API_Route<AppAPI_store__storeId__order>({
    GET: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId } = await params;

        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        if (!permission.isStaff) return AppAPI.response.genError.Forbidden();

        const start = req.nextUrl.searchParams.get("start");
        const userVerifyKey = req.nextUrl.searchParams.get("userVerifyKey");

        try {
            if (userVerifyKey) {
                const data = await AppDB.order.store.get_userVerifyKey(storeId, userVerifyKey);
                return data ? NextResponse.json({
                    success: true,
                    data
                }) : AppAPI.response.genError.NotFound()
                
            } else {
                const data = await AppDB.order.store.get(storeId, start ?? undefined);
                return NextResponse.json({
                    success: true,
                    data
                })

            }

        } catch (e) {
            return AppAPI.response.genError.ServerError()
        }
    }
})
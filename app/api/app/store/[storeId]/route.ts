import { AppDB, AppDB_Types } from "@/libs/db";
import { app_api_map_gen, app_api_response } from "../../api";
import { API_Route } from "@/libs/api/route";
import { AppAPI } from "@/libs/api";
import { NextResponse } from "next/server";

export type AppAPI_store__storeId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "storeId"
            params: undefined,
            body: AppDB_Types["store"]["edit"]
        },
        res: app_api_response<undefined>
    },
    DELETE: {
        req: {
            pathParams: "storeId"
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>



export const {
    PATCH,
    DELETE
} = API_Route<AppAPI_store__storeId>({
    PATCH: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId } = await params;

        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();

        const body = await req.json();

        try {
            await AppDB.store.update(storeId, body);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    },
    DELETE: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.check(email)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();

        const { storeId } = await params;

        try {
            await AppDB.store.remove(storeId);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
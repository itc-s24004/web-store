import { app_api_map_gen, app_api_response } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { API_Route } from "@/libs/api/route";
import { AppDB, AppDB_Types } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_store__storeId__order__orderId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "storeId" | "orderId",
            params: undefined,
            body: AppDB_Types["order"]["update"]
        },
        res: app_api_response<undefined>
    }
}>





const PATCH_BODY = z.object({
    isReady: z.boolean().optional(),
    isCanceled: z.boolean().optional(),
    isReceived: z.boolean().optional()
})


export const {

} = API_Route<AppAPI_store__storeId__order__orderId>({
    PATCH: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId, orderId } = await params;

        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        if (!permission.isStaff) return AppAPI.response.genError.Forbidden();

        const body = PATCH_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        try {
            await AppDB.order.update(orderId, body.data);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
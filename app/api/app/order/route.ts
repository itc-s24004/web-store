import { AppDB, AppDB_Types } from "@/libs/db";
import { app_api_map_gen, app_api_response } from "../api";
import { API_Route } from "@/libs/api/route";
import { AppAPI } from "@/libs/api";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_order = app_api_map_gen<{
    POST: {
        req: {
            pathParams: undefined,
            params: undefined,
            body: {
                storeId: string,
                cartItemIds: string[]
            }
        },
        res: app_api_response<undefined>
    }
}>



const POST_BODY = z.object({
    storeId: z.ulid(),
    cartItemIds: z.array(z.ulid())
})



export const {
    POST
} = API_Route<AppAPI_order>({
    POST: async (req) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.check(email)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();

        const body = POST_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }
        
        const { storeId, cartItemIds } = body.data;

        try {
            await AppDB.order.email.add(email, storeId, cartItemIds)
            return NextResponse.json({
                success: true,
                data: undefined
            })
        } catch (e) {
            return AppAPI.response.genError.ServerError()
        }
    }
})
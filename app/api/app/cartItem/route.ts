import { API_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_cartItem = app_api_map_gen<{
    POST: {
        req: {
            pathParams: undefined,
            params: undefined,
            body: {
                storeId: string,
                productId: string,
                quantity: number
            }
        },
        res: app_api_response<undefined>
    }
}>




const POST_BODY = z.object({
    storeId: z.ulid(),
    productId: z.ulid(),
    quantity: z.number().int().positive()
})

export const {
    POST
} = API_Route<AppAPI_cartItem>({
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

        const { storeId, productId, quantity } = body.data;
        
        try {
            await AppDB.cartItem.email.add(email, storeId, productId, quantity)
            return NextResponse.json({
                success: true,
                data: undefined
            })
        } catch (e) {
            return AppAPI.response.genError.ServerError()
        }
    }
})
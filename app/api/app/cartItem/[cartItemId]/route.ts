import { API_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../../api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_cartItem__cartItemId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "cartItemId",
            params: undefined,
            body: {
                quantity: number
            }
        },
        res: app_api_response<undefined>
    },
    DELETE: {
        req: {
            pathParams: "cartItemId",
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>


export const {

} = API_Route<AppAPI_cartItem__cartItemId>({
    PATCH: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.check(email)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();

        const { cartItemId } = await params;

        const body = z.object({
            quantity: z.number().int().positive()
        }).safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        const { quantity } = body.data;

        try {
            await AppDB.cartItem.email.update(email, cartItemId, {
                count: quantity
            })
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

        const { cartItemId } = await params;

        try {
            await AppDB.cartItem.email.remove(email, cartItemId)
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()

        }
    }
})
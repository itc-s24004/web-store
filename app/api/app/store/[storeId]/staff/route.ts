import { API_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../../../api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";
import { AppCrypto } from "@/libs/crypto/crypto";

export type AppAPI_store__storeId__staff = app_api_map_gen<{
    POST: {
        req: {
            pathParams: "storeId",
            params: undefined,
            body: {
                email: string;
            }
        },
        res: app_api_response<undefined>
    }
}>



const POST_BODY = z.object({
    email: z.string()
})

export const {
    POST
} = API_Route<AppAPI_store__storeId__staff>({
    POST: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId } = await params;

        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        
        const allow = permission.isAdmin || permission.isOwner;
        if (!allow) return AppAPI.response.genError.Forbidden();

        const body = POST_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }
        

        try {
            const rawEmail = AppCrypto.encrypt(body.data.email);
            await AppDB.staff.store.add_email(storeId, rawEmail, false);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            console.error(e);
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
import { API_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../../../api";
import { AppDB, AppDB_Types } from "@/libs/db";
import { AppAPI } from "@/libs/api";
import z from "zod";
import { NextResponse } from "next/server";

export type AppAPI_store__storeId__product = app_api_map_gen<{
    POST: {
        req: {
            pathParams: "storeId",
            params: undefined,
            body: {
                name: string,
                description: string,
                price: number
            }
        },
        res: app_api_response<AppDB_Types["product"]["edit"]>
    }
}>






const POST_BODY = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(200),
    price: z.number().positive()
})


export const {
    POST
} = API_Route<AppAPI_store__storeId__product>({
    POST: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId } = await params;
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();

        const body =  POST_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        const { name, description, price } = body.data;

        try {
            const product = await AppDB.product.add(storeId, name, description, price)
            return NextResponse.json({
                success: true,
                data: product
            })

        } catch {
            return AppAPI.response.genError.ServerError();
            
        }
    }
})
import { app_api_map_gen, app_api_response, app_api_response_error } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { AppAPI_Route } from "@/libs/api/route";
import { AppDB, AppDB_Types } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_store__storeId__productGroup = app_api_map_gen<{
    POST: {
        req: {
            pathParams: "storeId",
            params: undefined,
            body: {
                name: string,
                showTop?: boolean,
                imgId?: string
            }
        },
        res: app_api_response<AppDB_Types["productGroup"]["edit"]>
    }
}>


const POST_BODY = z.object({
    name: z.string().min(1).max(50),
    showTop: z.boolean().optional(),
    imgId: z.string().optional()
})



export const { POST }: AppAPI_Route<AppAPI_store__storeId__productGroup> = {
    async POST(req, { params }) {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId } = await params;
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        console.log(permission)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();



        const body = POST_BODY.safeParse(await req.json());

        if (!body.success) return NextResponse.json<app_api_response_error>({
            success: false,
            error: body.error.issues.map(i => i.message).join(", ")
        })
        
        const { name, showTop, imgId } = body.data;

        try {
            const productGroup = await AppDB.productGroup.add(storeId, name, showTop, imgId);
            return NextResponse.json<AppAPI_store__storeId__productGroup["POST"]["res"]>({
                success: true,
                data: productGroup
            });

        } catch {
            return AppAPI.response.errorResponse.ServerError;
            
        }
    }
}



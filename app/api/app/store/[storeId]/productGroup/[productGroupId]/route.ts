import { app_api_map_gen, app_api_response } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { AppAPI_Route } from "@/libs/api/route";
import { AppDB, AppDB_Types } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_store__storeId__productGroup__productGroupId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "storeId" | "productGroupId",
            params: undefined,
            body: AppDB_Types["productGroup"]["update"]
        },
        res: app_api_response<undefined>
    },
    DELETE: {
        req: {
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>




const PATCH_BODY = z.object({
    name: z.string().min(1).max(50).optional(),
    showTop: z.boolean().optional(),
    imgId: z.string().nullable().optional()
})



export const { PATCH, DELETE }: AppAPI_Route<AppAPI_store__storeId__productGroup__productGroupId> = {
    async PATCH (req, { params }) {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId, productGroupId } = await params;
        // 商品グループの変更は、対象店舗のオーナーだけに許可する。
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();

        // 更新可能な項目と値をリクエストボディで検証する。
        const body = PATCH_BODY.safeParse(await req.json());
        if (!body.success) return NextResponse.json({
            success: false,
            error: body.error.issues.map(i => i.message).join(", ")
        })


        try {
            await AppDB.productGroup.update({
                id: productGroupId,
                storeId
            }, body.data);
            return NextResponse.json<AppAPI_store__storeId__productGroup__productGroupId["PATCH"]["res"]>({
                success: true,
                data: undefined
            });

        } catch {
            return AppAPI.response.errorResponse.ServerError;
            
        }
    },

    
    async DELETE(req, { params }) {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId, productGroupId } = await params;
        // 商品グループの削除は、対象店舗のオーナーだけに許可する。
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();

        try {
            await AppDB.productGroup.remove({
                id: productGroupId,
                storeId
            });
            return NextResponse.json<AppAPI_store__storeId__productGroup__productGroupId["DELETE"]["res"]>({
                success: true,
                data: undefined
            });

        } catch {
            return AppAPI.response.errorResponse.ServerError;
            
        }
    }
}





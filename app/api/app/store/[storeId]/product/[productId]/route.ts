import { app_api_map_gen, app_api_response } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { API_Route } from "@/libs/api/route";
import { AppDB, AppDB_Types } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_store__storeId__product__productId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "storeId" | "productId",
            params: undefined,
            body: AppDB_Types["product"]["update"]
        },
        res: app_api_response<undefined>
    },
    DELETE: {
        req: {
            pathParams: "storeId" | "productId",
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>




const PATCH_BODY = z.object({
    name: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(200).optional(),
    price: z.number().positive().optional()
})

export const {
    PATCH
} = API_Route<AppAPI_store__storeId__product__productId>({
    PATCH: async (req, { params }) => {
        // 商品情報の更新にはログインが必要です。
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId, productId } = await params;
        // 対象店舗のオーナーだけが商品を更新できるようにします。
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isOwner) return AppAPI.response.genError.Forbidden();

        // リクエスト本文に含まれる更新項目と値を検証します。
        const body =  PATCH_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        try {
            await AppDB.product.store.update(storeId, productId, body.data)
            return NextResponse.json({
                success: true,
                data: undefined
            })
        } catch (e) {
            return AppAPI.response.genError.ServerError()
        }
    },
    DELETE: async (req, { params }) => {
        // 商品の削除にはログインが必要です。
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const { storeId, productId } = await params;
        
        // 対象店舗のオーナーまたは管理者だけが商品を削除できるようにします。
        const permission = await AppAPI.permission.checkStaff(email, storeId)
        if (!permission) return AppAPI.response.genError.Unauthorized();
        const allow = permission.isOwner || permission.isAdmin;
        if (!allow) return AppAPI.response.genError.Forbidden();

        try {
            await AppDB.product.store.remove(storeId, productId)
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
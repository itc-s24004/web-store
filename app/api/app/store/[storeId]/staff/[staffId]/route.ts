import { app_api_map_gen, app_api_response } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { API_Route } from "@/libs/api/route";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_store__storeId__staff__staffId = app_api_map_gen<{
    PATCH: {
        req: {
            pathParams: "storeId" | "staffId",
            params: undefined,
            body: {
                isAdmin: boolean
            }
        },
        res: app_api_response<undefined>
    },
    DELETE: {
        req: {
            pathParams: "storeId" | "staffId",
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>




const PATCH_BODY = z.object({
    isAdmin: z.boolean()
})


export const {
    PATCH,
    DELETE
} = API_Route<AppAPI_store__storeId__staff__staffId>({
    PATCH: async (req, { params }) => {
        // セッションユーザーを取得し、未認証のリクエストを拒否する。
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId, staffId } = await params;

        // 対象店舗のスタッフ権限と、操作がロックされていないことを確認する。
        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        const allow = permission.isAdmin || permission.isOwner;
        if (!allow) return AppAPI.response.genError.Forbidden();

        const body = PATCH_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        const { isAdmin } = body.data;

        try {
            // 指定されたスタッフの管理者権限を更新する。
            await AppDB.staff.store.update(storeId, staffId, isAdmin);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    },
    DELETE: async (req, { params }) => {
        // セッションユーザーを取得し、未認証のリクエストを拒否する。
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const { storeId, staffId } = await params;

        // 対象店舗のスタッフ権限と、操作がロックされていないことを確認する。
        const permission = await AppAPI.permission.checkStaff(email, storeId);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (permission.isLock) return AppAPI.response.genError.Forbidden();
        const allow = permission.isAdmin || permission.isOwner;
        if (!allow) return AppAPI.response.genError.Forbidden();

        try {
            // 指定されたスタッフを店舗から削除する。
            await AppDB.staff.store.remove(storeId, staffId);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
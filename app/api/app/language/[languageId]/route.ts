import { app_api_map_gen, app_api_response } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { API_Route } from "@/libs/api/route";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";

export type AppAPI_language__languageId = app_api_map_gen<{
    DELETE: {
        req: {
            pathParams: "languageId",
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    },
    PATCH: {
        req: {
            pathParams: "languageId",
            params: undefined,
            body: {
                name: string
            }
        },
        res: app_api_response<undefined>
    }
}>

const PATCH_BODY = z.object({
    name: z.string().min(1).max(16)
}) satisfies z.ZodType<
    AppAPI_language__languageId["PATCH"]["req"]["body"]
>;



export const {
    PATCH,
    DELETE
} = API_Route<AppAPI_language__languageId>({
    PATCH: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.get(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();


        const { languageId } = await params;

        const body = PATCH_BODY.safeParse(await req.json());
        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        try {
            await AppDB.language.update(languageId, body.data);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch {
            return AppAPI.response.genError.ServerError();
            
        }

    },
    DELETE: async (_req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.get(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();
        

        const { languageId } = await params;

        try {
            await AppDB.language.remove(languageId);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch {
            return AppAPI.response.genError.ServerError();

        }

    }
})



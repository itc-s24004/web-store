import { AppAPI } from "@/libs/api";
import { AppDB, AppDB_Types } from "@/libs/db";
import { NextResponse } from "next/server";
import z from "zod";
import { app_api_map_gen, app_api_response } from "../api";
import { API_Route } from "@/libs/api/route";

export type AppAPI_language = app_api_map_gen<{
    POST: {
        req: {
            params: undefined,
            body: {
                name: string
            }
        },
        res: app_api_response<AppDB_Types["language"]["model"]>
    }
}>;

const POST_BODY = z.object({
    name: z.string().min(1).max(16)
}) satisfies z.ZodType<
    AppAPI_language["POST"]["req"]["body"]
>;


export const {
    POST
} = API_Route<AppAPI_language>({
    POST: async (req) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.get(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();
        
        const body = POST_BODY.safeParse(await req.json());
        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        try {
            const language = await AppDB.language.add(body.data.name);

            return NextResponse.json<AppAPI_language["POST"]["res"]>({
                success: true,
                data: language
            });

        } catch {
            return AppAPI.response.genError.ServerError();

        }
    }
});


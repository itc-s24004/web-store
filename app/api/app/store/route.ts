import { AppAPI_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../api";
import { AppDB, AppDB_Types } from "@/libs/db";
import { AppAPI } from "@/libs/api";
import z from "zod";
import { NextResponse } from "next/server";

export type AppAPI_store = app_api_map_gen<{
    POST: {
        req: {
            params: undefined,
            body: {
                name: string,
                description: string
            }
        },
        res: app_api_response<AppDB_Types["store"]["edit"]>
    }
}>



const POST_BODY = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(200)
})

export const {
    POST
}: AppAPI_Route<AppAPI_store> = {
    async POST (req) {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();
        
        const permission = await AppAPI.permission.check(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();

        const body =  POST_BODY.safeParse(await req.json());

        if (!body.success) {
            return AppAPI.response.genError.BadRequest();
        }

        const { name, description } = body.data;


        try {
            const store = await AppDB.store.add(name, description);
            return NextResponse.json({
                success: true,
                data: store
            })

        } catch {
            return AppAPI.response.genError.ServerError();
            
        }
    }
}
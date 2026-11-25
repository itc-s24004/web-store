import { AppDB, AppDB_Types } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { AppAPI } from "@/libs/api";
import { db } from "@/libs/db/db";
import { app_api_map_gen, app_api_response } from "../api";
import { API_Route } from "@/libs/api/route";

export type AppAPI_image = app_api_map_gen<{
    GET: {
        req: {
            params: undefined,
            body: undefined
        },
        res: app_api_response<AppDB_Types["image"]["model"][]>
    },
    POST: {
        req: {
            params: undefined,
            body: FormData
        },
        res: app_api_response<AppDB_Types["image"]["model"]>
    }
}>



export const {
    GET,
    POST
} = API_Route<AppAPI_image>({
    GET: async (req) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.get(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();

        try {
            const images = await AppDB.image.getAll();
            return NextResponse.json({
                success: true,
                data: images
            })
        } catch (e) {
            return AppAPI.response.genError.ServerError()
        }
    },
    POST: async (req) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.check(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();

        const file = (await req.formData()).get("file");
        if (!(file instanceof File)) return AppAPI.response.genError.BadRequest();

        const type = file.type;
        if (type !== "image/jpeg" && type !== "image/png")return AppAPI.response.genError.BadRequest();

        try {
            const blob = await put(crypto.randomUUID(), file, {
                access: "public",
                contentType: type
            })
            const image = await AppDB.image.add(blob.downloadUrl);
            return NextResponse.json({
                success: true,
                data: image
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
import { API_Route } from "@/libs/api/route";
import { app_api_map_gen, app_api_response } from "../../api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { NextResponse } from "next/server";

export type AppAPI_image__imageId = app_api_map_gen<{
    DELETE: {
        req: {
            pathParams: "imageId",
            params: undefined,
            body: undefined
        },
        res: app_api_response<undefined>
    }
}>


export const {

} = API_Route<AppAPI_image__imageId>({
    DELETE: async (req, { params }) => {
        const email = await AppAPI.session.getEmail();
        if (!email) return AppAPI.response.genError.Unauthorized();

        const permission = await AppAPI.permission.get(email);
        if (!permission) return AppAPI.response.genError.Unauthorized();
        if (!permission.isAdmin) return AppAPI.response.genError.Forbidden();
        
        const { imageId } = await params;

        try {
            await AppDB.image.remove(imageId);
            return NextResponse.json({
                success: true,
                data: undefined
            })

        } catch (e) {
            return AppAPI.response.genError.ServerError()
            
        }
    }
})
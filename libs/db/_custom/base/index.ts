"use cache"


import { cacheLife } from "next/cache";
import { AppDB } from "../..";
import { APP_ENV } from "@/app/env";
import { SystemTextIds } from "../../systemText/id";

export async function get() {
    const title = await AppDB.systemText.get(SystemTextIds.TXT_TITLE);
    const languages = await AppDB.language.getAll();

    return {
        title,
        languages
    }
}


export async function getCache() {
    cacheLife({
        revalidate: APP_ENV.SERVER_CACHE * 3
    })
    
    return get();
}


export type models = {
    model: Awaited<ReturnType<typeof get>>,
}
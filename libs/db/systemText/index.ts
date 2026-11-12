import { cacheLife, revalidateTag, unstable_cache } from "next/cache";
import { db } from "../db";
import { SystemTextIds } from "./id";
import { models } from "./type";
import { APP_ENV } from "@/app/env";


export async function get(id: SystemTextIds) {
    return db.systemText.findUnique({
        where: {
            id
        },
        select: {
            text: true,
            langMaps: {
                select: {
                    text: true,
                    langId: true
                }
            }
        }
    })
}

export async function getDetail(id: SystemTextIds): Promise<models["detail"] | null> {
    return db.systemText.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            text: true,
            langMaps: {
                select: {
                    id: true,
                    text: true,
                    langId: true
                }
            }
        }
    })
}


export async function getAll() {
    const systemTexts = await Promise.all(Object.values(SystemTextIds).map(id => getDetail(id)));
    return Object.fromEntries(systemTexts.filter(st => st !== null).map(st => [st.id, st])) as {
        [key in SystemTextIds]?: models["detail"]
    };
}

export const getAll_cache = unstable_cache(
    async () => {
        return getAll();
    },
    ["systemText"],
)
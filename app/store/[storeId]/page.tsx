import { api_url_param_gen } from "@/app/api/app/api";
import { AppDB } from "@/libs/db";
import { notFound } from "next/navigation";
import { PgeView } from "./view";
import { connection } from "next/server";
import { AppAPI } from "@/libs/api";



export const instant = false;

export default async function Route({ params }: api_url_param_gen<"storeId">) {
    await connection();
    const { storeId } = await params;


    const base = await AppDB._custom.base.getCache();
    const email = await AppAPI.session.getEmail();
    
    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;
    const store = AppDB.store.detail.getCache(storeId);

    return <PgeView user={user} store={store} {...base} />
}

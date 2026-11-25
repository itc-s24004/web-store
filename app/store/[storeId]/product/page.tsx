import { api_url_param_gen } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { connection } from "next/server";
import { PageView } from "./view";

export const instant = false;

export default async function Page({ params }: api_url_param_gen<"storeId">) {
    await connection();
    const { storeId } = await params;

    const base = await AppDB._custom.base.getCache();
    const email = await AppAPI.session.getEmail();

    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;
    const store = AppDB.store.model.getCache(storeId);
    const products = AppDB.product.store.model.getCache(storeId);


    return <PageView store={store} products={products} user={user} {...base} />
}
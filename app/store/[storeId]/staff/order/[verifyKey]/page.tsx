import { api_url_param_gen } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { forbidden, unauthorized } from "next/navigation";
import { connection } from "next/server";
import { PageView } from "./view";

export const instant = false;

export default async function Page({ params }: api_url_param_gen<"storeId" | "verifyKey">) {
    await connection();

    const { storeId, verifyKey } = await params;
    const email = await AppAPI.session.getEmail();
    const permission = email ? await AppAPI.permission.checkStaff(email, storeId) : null;
    if (!permission) unauthorized();
    const allow = permission.isStaff || permission.isAdmin;
    if (!allow) forbidden();

    const base = await AppDB._custom.base.getCache();
    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;
    const store = AppDB.store.model.getCache(storeId);
    const orders = AppDB.order.store.get_userVerifyKey(storeId, verifyKey);

    return <PageView store={store} orders={orders} user={user} {...base} /> 
}
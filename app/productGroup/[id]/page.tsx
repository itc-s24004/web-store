import { PageView } from "./view";
import { AppDB } from "@/libs/db";
import { api_url_param_gen } from "@/app/api/app/api";
import { AppAPI } from "@/libs/api";
import { connection } from "next/server";

export const instant = false

export default async function Page(req: api_url_param_gen<"id">) {
    await connection();
    const email = await AppAPI.session.getEmail();

    const id = (await req.params).id;

    const base = await AppDB._custom.base.getCache();
    const detail = AppDB.productGroup.detail.getCache(id);
    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;

    return <PageView productGroup={detail} {...base} user={user} />
}
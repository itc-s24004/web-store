import { AppAPI } from "@/libs/api";
import { AppDB } from "@/libs/db";
import { connection } from "next/server";
import { PageView } from "./view";
import { api_url_param_gen } from "@/app/api/app/api";
import { notFound } from "next/navigation";

export const instant = false;

export default async function Page({ params }: api_url_param_gen<"productId">) {
    await connection();
    const email = await AppAPI.session.getEmail();

    const productId = (await params).productId;

    const base = await AppDB._custom.base.getCache();
    const product = AppDB.product.detail.getCache(productId);
    if (!product) notFound();
    
    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;
    
    return <PageView {...base} product={product} user={user}/>
}
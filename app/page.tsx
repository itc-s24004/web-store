
import { AppDB } from "@/libs/db";
import { PageView } from "./view";
import { cacheLife } from "next/cache";
import { APP_ENV } from "./env";
import { AppAPI } from "@/libs/api";
import { connection } from "next/server";

export const instant = false;

export default async function Page() {
    await connection();
    const email = await AppAPI.session.getEmail();
    
  
  
    const base = await AppDB._custom.base.getCache();
    const productGroups = AppDB.productGroup.model.getCache();
    const user = email ? AppDB.user.email.detailMin.getCache(email) : undefined;
    
    return (
        <PageView {...base} productGroups={productGroups} user={user}/>
    );
}

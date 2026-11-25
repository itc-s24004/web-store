import { AppDB_Types } from "@/libs/db";
import { DefaultSystemTexts } from "@/libs/db/systemText/id";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, use } from "react";
import { genPromiseProps } from "../type.gen";

type Header_Props = {
    userLanguageId?: string | null,
    onLanguageChange?: (languageId: string | null) => void,

    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]


export function View_Header({ languages, userLanguageId, onLanguageChange, title, user }: Header_Props) {
    
    return (
        <div
            className="relative flex w-full items-center justify-between bg-(--app-theme-sub) px-4 py-2 transition-colors duration-200"
        >
            <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                <Image src={"/logo.png"} alt={""} width={35} height={35} className="rounded-sm"/>
                <div className="relative w-fit whitespace-nowrap text-xl font-semibold leading-normal tracking-tight text-(--app-theme-text)">
                    {title?.text ?? DefaultSystemTexts.TXT_TITLE}
                </div>
            </div>
            <Suspense>
                {user && <User user={user} />}
            </Suspense>
        </div>
    );
};


type User_Props = {
    user: AppDB_Types["user"]["detailMin"] | null
}

function User({ user }: genPromiseProps<User_Props, "user">) {
    const data = use(user);
    
    return <View_User user={data} />
}



function View_User({ user }: User_Props) {
    return (
        <Link
            hidden={user === null}
            href={"/message"} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-(--primary) px-1 text-xs font-medium text-(--background) shadow-sm"
        >
            <Bell />
            <span hidden={user?._count.messages === undefined || user?._count.messages < 1} className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--secondary) text-[10px] font-bold text-(--background)">
                {user?._count.messages}
            </span>
        </Link>
    )
}
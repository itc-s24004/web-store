"use client";


import { AppDB_Types } from "@/libs/db";
import { Button } from "@/libs/element/button";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
// import { Header } from "@/libs/element/layout/header";
import { Navigation } from "@/libs/element/layout/navigation";
import { useAPI_UserDetailMin } from "@/libs/element/state/appAPI/userAPI_UserDetailMin";
import { useLanguage } from "@/libs/element/state/useLanguage";
import { View_Header } from "@/libs/element/view/header";
import { signOut } from "next-auth/react";
import Link from "next/link";

type PageView_Props = {
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ ...base }: PageView_Props) {
    
    const userLang = useLanguage();
    const user = useAPI_UserDetailMin();
    if (user.user?.langId && user.user.langId !== userLang.langId) userLang.setLangId(user.user.langId);
    
    return (
        <AppView>
            <View_Header {...base} />
            <ContentWrapper>
                <Content>
                    <Button
                        className="w-full p-4 bg-(--container-background) rounded-md"
                        onClick={() => {
                            signOut({ callbackUrl: "/login" })
                        }}
                    >
                        ログアウト
                    </Button>
                    <Link href="/how-to-use">
                        使い方
                    </Link>
                    <Link href="/privacy">
                        プライバシーポリシー
                    </Link>
                    <Link href="/terms">
                        利用規約
                    </Link>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}



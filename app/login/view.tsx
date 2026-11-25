"use client"


import { AppDB_Types } from "@/libs/db";
import { Button } from "@/libs/element/button";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { View_Header } from "@/libs/element/view/header";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type PageView_Props = {
    
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ ...base }: PageView_Props) {
    return (
        <AppView>
            <View_Header {...base} />
            <ContentWrapper>
                <Content>
                    <div className="flex flex-col gap-2 max-w-lg mx-auto p-4">
                        <Image src={"/logo_512.png"} alt={""} width={512} height={512} className="aspect-sqare w-full rounded-xl" />
                        <Button className="w-full p-4 bg-(--container-background) rounded-md" onClick={() => signIn("google", { callbackUrl: "/" })}>
                            ログイン
                        </Button>
                        {/* <Link href={"/tutorial"} className="w-full p-4 bg-(--container-background) rounded-md text-center">
                            使い方
                        </Link> */}
                    </div>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}
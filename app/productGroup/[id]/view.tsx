"use client"


import { AppDB_Types } from "@/libs/db";
import { Container } from "@/libs/element/container";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { View_Card_Product } from "@/libs/element/view/card/product";
import { View_Header } from "@/libs/element/view/header";
import { Suspense, use } from "react";

type PageView_Props = {
    productGroup: Promise<AppDB_Types["productGroup"]["detail"] | null>
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ title, languages, productGroup, user }: PageView_Props) {
    
    
    return (
        <AppView>
            <View_Header userLanguageId={null} title={title} languages={[]} user={user} />
            <ContentWrapper>
                <Content>
                    <Container className="gap-2 p-2">
                        <Suspense fallback={
                            <>
                                <View_Card_Product />
                                <View_Card_Product />
                                <View_Card_Product />
                            </>
                        }>
                            <PG pg={productGroup} />
                        </Suspense>
                    </Container>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}

function PG({pg}: {pg: Promise<AppDB_Types["productGroup"]["detail"] | null>}) {
    const p = use(pg);
    
    return (
        <>
            {
                p?.items.map((item, i) => (
                    <View_Card_Product key={i} product={item.product} titleLink={true} />
                ))
            }
        </>
    )
}
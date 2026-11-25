"use client"


import { AppDB_Types } from "@/libs/db";
import { DefaultSystemTexts } from "@/libs/db/systemText/id";
import { Carousel } from "@/libs/element/carousel";
import { Container } from "@/libs/element/container";
import { Display_ProductGroup } from "@/libs/element/display/productGroup";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { useAPI_UserDetailMin } from "@/libs/element/state/appAPI/userAPI_UserDetailMin";
import { useServiceWorker } from "@/libs/element/state/useServiceWorker";
import { useWebPush } from "@/libs/element/state/useWebPush";
import { View_Card_ProductGroup } from "@/libs/element/view/card/productGroup";
import { View_Header } from "@/libs/element/view/header";
import { View_Panel_ProductGroup } from "@/libs/element/view/panel/productGroup";
import Image from "next/image";
import Link from "next/link";
import { Suspense, use } from "react";


type PageView_Props = {
    productGroups: Promise<AppDB_Types["productGroup"]["model"][]>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>

} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ title, languages, productGroups, user }: PageView_Props) {
    // const serviceWorker = useServiceWorker();
    // const webpush = useWebPush(() => {
    //     user.request()
    // })

    // if (!user.waiting && !webpush.waiting && user.user?.subscribe_hash && webpush.hash && webpush.hash !== user.user.subscribe_hash) {
    //     webpush.unsubscribe.request();
    // }
    
    
    
    return (
        <AppView>
            <View_Header userLanguageId={null} user={user} title={null} languages={[]} />
            <ContentWrapper>
                <Content>
                    <Container className="gap-2 p-2">
                        <Suspense fallback={
                            <Container className="gap-2 p-2">
                                <View_Panel_ProductGroup.View />
                                <View_Panel_ProductGroup.View />
                                <View_Panel_ProductGroup.View />
                                <View_Panel_ProductGroup.View />
                                <View_Panel_ProductGroup.View />
                            </Container>
                        }>
                            <PGsPromise productGroups={productGroups} />
                        </Suspense>
                    </Container>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}


function PGs({ productGroups }: { productGroups: AppDB_Types["productGroup"]["model"][] }) {
    return (
        <Container className="gap-2 p-2">
            {
                productGroups.map((pg) => (
                    <Link key={pg.id} href={`/productGroup/${pg.id}`} className="">
                        <View_Panel_ProductGroup.View productGroup={pg} />
                    </Link>
                ))
            }
        </Container>
    )
}

function PGsPromise({ productGroups }: { productGroups: Promise<AppDB_Types["productGroup"]["model"][]> }) {
    const pgs = use(productGroups);

    return <PGs productGroups={pgs} />
}
import { AppDB_Types } from "@/libs/db";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { View_Header } from "@/libs/element/view/header";
import { View_StoreHeader } from "@/libs/element/view/header/store";
import { Suspense } from "react";

type Props = {
    store: Promise<AppDB_Types["store"]["model"] | null>,
    orders: Promise<AppDB_Types["order"]["orderMin"][] | null>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ store, orders, user, ...base }: Props) {
    return (
        <AppView>
            <View_Header {...base} user={user} />
            <ContentWrapper>
                <Content>
                    <Suspense fallback={<View_StoreHeader.View store={undefined} />}>
                        <View_StoreHeader.PromiseView store={store} />
                    </Suspense>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}
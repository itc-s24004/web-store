import { AppDB_Types } from "@/libs/db"
import { Container } from "@/libs/element/container"
import { AppView } from "@/libs/element/layout"
import { Content } from "@/libs/element/layout/content"
import { ContentWrapper } from "@/libs/element/layout/contentWrapper"
import { Navigation } from "@/libs/element/layout/navigation"
import { View_Card_Product } from "@/libs/element/view/card/product"
import { View_Header } from "@/libs/element/view/header"
import { View_StoreHeader } from "@/libs/element/view/header/store"
import { Suspense, use } from "react"

type Props = {
    store: Promise<AppDB_Types["store"]["model"] | null>,
    products: Promise<AppDB_Types["product"]["model"][]>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ store, products, ...base }: Props) {
    return (
        <AppView>
            <View_Header {...base} />
            <ContentWrapper>
                <Content>
                    <Suspense fallback={<View_StoreHeader.View store={undefined} />}>
                        <View_StoreHeader.PromiseView store={store} />
                    </Suspense>
                    <Container className="gap-2">
                        <Suspense fallback={
                            <>
                                <View_Card_Product />
                                <View_Card_Product />
                                <View_Card_Product />
                            </>
                        }>
                            <Ps products={products} />
                        </Suspense>
                    </Container>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}


type Ps_Props = {
    products: Promise<AppDB_Types["product"]["model"][]>
}

function Ps({ products }: Ps_Props) {
    const data = use(products);

    return data.map(product => (
        <View_Card_Product key={product.id} product={product} titleLink />
    ))
}
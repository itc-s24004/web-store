import { AppDB_Types } from "@/libs/db"
import { AppView } from "@/libs/element/layout"
import { Content } from "@/libs/element/layout/content"
import { ContentWrapper } from "@/libs/element/layout/contentWrapper"
import { Navigation } from "@/libs/element/layout/navigation"
import { View_Header } from "@/libs/element/view/header"
import { View_StoreHeader } from "@/libs/element/view/header/store"
import { Suspense } from "react"

type PageView_Props = {
    store: Promise<AppDB_Types["store"]["detail"] | null>,

    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]

export function PgeView({ store, ...base }: PageView_Props) {
    
    return (
        <AppView>
            <View_Header {...base} />
            <ContentWrapper>
                <Content>
                    <Suspense fallback={<View_StoreHeader.View store={undefined} />}>
                        <View_StoreHeader.PromiseView store={store} />
                    </Suspense>
                    {/* <div>
                    {store.img?.url && <Image src={store.img.url} width={1920} height={400} alt={title} className="mb-3 w-full rounded-lg" />}
                    
                    <div className="sticky top-0">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-lg">{store.description}</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-3">
                            <Link href={`/store/${store.id}`}>
                                ホーム
                            </Link>
                            <Link href={`/store/${store.id}/product`}>
                                すべての商品
                            </Link>
                            <Link href={`/store/${store.id}/customPage`}>
                                記事
                            </Link>
                        </div>
                    </div>
                    <div>d
                        <h2 className="mt-5 text-xl font-bold">商品グループ</h2>
                        <div>
                            {
                                store.productGroups.map(pg => (
                                    <View_Card_ProductGroup key={pg.id} productGroup={pg} />
                                ))
                            }
                        </div>
                    </div>
                    </div> */}
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}
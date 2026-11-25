"use client"


import { API_Client } from "@/app/api/app/client";
import { AppDB_Types } from "@/libs/db";
import { Button } from "@/libs/element/button";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { Price } from "@/libs/element/price";
import { useAPI } from "@/libs/element/state/useAPI";
import { Styles } from "@/libs/element/style/style";
import { View_Card_ProductGroup } from "@/libs/element/view/card/productGroup";
import { View_Header } from "@/libs/element/view/header";
import { Loading } from "@/libs/element/view/loading";
import { genPromiseProps } from "@/libs/element/view/type.gen";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, use, useState } from "react";

type Props = {
    product: Promise<AppDB_Types["product"]["detail"] | null>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ product, ...base }: Props) {
    return (
        <AppView>
            <View_Header {...base}/>
            <ContentWrapper>
                <Content>
                    <Suspense fallback={
                        <View />
                    }>
                        <PromiseView product={product} />
                    </Suspense>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}


// const LoadingDiv = Loading((p: React.JSX.IntrinsicElements["div"]) => <div {...p} />);
// const LoadingH2 = Loading((p: React.JSX.IntrinsicElements["h2"]) => <h2 {...p} />);



type LC = {
    loadingClassName?: string
}

function LoadingDiv({ loadingClassName, ...p}: React.JSX.IntrinsicElements["div"] & LC) {
    return <div {...p} className={[
        p.children === undefined ? `${Styles.loading} ${loadingClassName}` : "",
        p.className
    ].join(" ")}/>;
}

function LoadingH2({ loadingClassName, ...p}: React.JSX.IntrinsicElements["h2"] & LC) {
    return <h2 {...p} className={[
        p.children === undefined ? `${Styles.loading} ${loadingClassName}` : "",
        p.className
    ].join(" ")}/>;
}


type ViewProps = {
    product?: AppDB_Types["product"]["detail"] | null
}

function View({ product }: ViewProps) {
    const [error, setError] = useState(false);
    const add = useAPI(async () => {
        if (!product) return;
        const res = await API_Client.cartItem.add(product.store.id, product.id, 1);
    })
    
    return (
        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-0 p-2">
            <div className="flex justify-center w-full sm:w-auto bg-(--background) sm:sticky top-0 p-2">
                <LoadingDiv className="size-80 sm:size-70 lg:size-120" loadingClassName="bg-(--background-sub)">
                    {
                        product?.img && <Image src={product.img.url} alt={product.name} width={300} height={300} className="w-full aspect-square" />
                    }
                </LoadingDiv>
            </div>
            <div className="flex-1 w-full">
                <div className="sticky top-0 p-2 bg-(--background)">
                    <LoadingH2 className="text-2xl font-bold min-h-lh" loadingClassName="bg-(--background-sub) min-h-lh">
                        {product?.name}
                    </LoadingH2>
                    <LoadingDiv loadingClassName="bg-(--background-sub) min-h-lh">
                        {
                            product &&
                            <Link href={`/store/${product.store.id}`} className="text-blue-500 hover:underline">
                                {product.store.name}
                            </Link>
                        }
                    </LoadingDiv>
                    <LoadingDiv loadingClassName="bg-(--background-sub) min-h-lh">
                        {
                            product && <Price>{product.price}</Price>
                        }
                    </LoadingDiv>
                    <LoadingDiv>
                        {
                            product && product.stock
                        }
                    </LoadingDiv>
                    <Button onClick={() => add.request()} disabled={add.waiting}>
                        {
                            add.waiting ? "追加中" : "カートに追加"
                        }
                    </Button>
                </div>
                <div className="flex gap-2 p-2 flex-wrap">
                    {
                        product?.items.map((item, i) => (
                            <Link key={i} href={`/productGroup/${item.productGroup.id}`} className="xs:min-w-md flex-1">
                                <View_Card_ProductGroup productGroup={item.productGroup}/>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


function PromiseView({ product }: genPromiseProps<ViewProps, "product">) {
    const d = use(product);

    return <View product={d} />
}
"use client"


import { AppDB_Types } from "@/libs/db";
import { Button } from "@/libs/element/button";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { useAPI } from "@/libs/element/state/useAPI";
import { ArrowBigDown, BellRing, LoaderCircle, Minus, Plus, ReceiptText, ShoppingCart, Trash, X } from "lucide-react";
import { API_Client } from "../api/app/client";
import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import { useWebPush } from "@/libs/element/state/useWebPush";
import { useAPI_UserDetailMin } from "@/libs/element/state/appAPI/userAPI_UserDetailMin";
import { Popup } from "@/libs/element/popup";
import { genPromiseProps } from "@/libs/element/view/type.gen";
import { View_Header } from "@/libs/element/view/header";

type PageView_Props = {
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>,
    items: Promise<AppDB_Types["cartItem"]["storeGroup"][]>,
} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ items, user, ...base }: PageView_Props) {
    const data = use(items);
    // const webpush = useWebPush(() => {
    //     window.location.reload();
    // })

    // const reqireRequestWebPush = !(user?.subscribe_hash && webpush.hash && webpush.hash === user.user.subscribe_hash) && !user.waiting && !webpush.waiting;
    // const [showWebPushPopup, setShowWebPushPopup] = useState(false);
    
    return (
        <AppView>
            <View_Header {...base} user={user}/>
            <ContentWrapper>
                <Content>
                    <Suspense fallback={<View storeItems={data} />}>
                        <PromiseView storeItems={items} />
                    </Suspense>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}


type View_Props = {
    storeItems?: AppDB_Types["cartItem"]["storeGroup"][]
}

function View({ storeItems }: View_Props) {
    const isLoading = storeItems === undefined;
    
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 py-5">
            <div className="flex items-end justify-between px-1">
                <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-(--app-theme-sub)/65">YOUR CART</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-(--text-color)">カート</h1>
                </div>
                <span className="rounded-full bg-(--container-background) px-3 py-1 text-sm font-semibold text-(--text-color-sub)">
                    {/* {storeItems.length}商品 */}
                </span>
            </div>
            <div className="flex flex-col gap-3">
                {
                    !isLoading &&
                    storeItems.map((storeCart) => (
                        <StoreCart_View
                            key={storeCart.id}
                            storeCart={storeCart}
                        />
                    ))
                }
            </div>
        </div>
    )
}



function PromiseView({ storeItems }: genPromiseProps<View_Props, "storeItems">) {
    const data = use(storeItems);
    
    return <View storeItems={data} />;
}







type StoreCart_View_Props = {
    storeCart?: AppDB_Types["cartItem"]["storeGroup"],
    user?: AppDB_Types["user"]["detailMin"]
}

function StoreCart_View({ storeCart, user }: StoreCart_View_Props) {
    const isLoading = storeCart === undefined;
    
    const order = useAPI(async () => {
        if (!storeCart) return;
        const res = await API_Client.order.add(storeCart.id, storeCart.cartItems.filter(item => item.count <= item.product.stock).map((item) => item.id));
        if (res?.body.success) {
            // get.request();
        }
    })
    
    const total = storeCart?.cartItems.reduce((acc, item) => acc + (item.product.price * item.count), 0) ?? 0;

    const webpush = useWebPush(() => {
        window.location.reload();
    })

    const reqireRequestWebPush = !(user?.subscribe_hash && webpush.hash && webpush.hash === user.subscribe_hash) && !webpush.waiting;
    const [showWebPushPopup, setShowWebPushPopup] = useState(false);
    
    return (
        <div>
            <div

            >
                <h2>
                    {!isLoading && storeCart.name}
                </h2>
                <div className="overflow-hidden rounded-2xl border border-(--container-background-sub)/70 bg-(--container-background) shadow-sm">
                    <div className="flex items-center justify-between px-4 py-4 sm:px-5">
                        <span className="text-sm text-(--text-color-sub)">合計金額</span>
                        <span className="text-2xl font-bold text-(--app-theme)">¥{total}</span>
                    </div>
                    <div className="px-4 pb-4 sm:px-5">
                        <Button
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--app-theme) p-3 text-lg font-bold text-(--app-theme-text) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => {
                                if (reqireRequestWebPush) {
                                    setShowWebPushPopup(true);
                                }
                                order.request()
                            }}
                            disabled={order.waiting}
                        >
                            {order.waiting ? <LoaderCircle size={21} className="animate-spin" /> : "オーダーを確定"}
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {
                    !isLoading &&
                    storeCart.cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            cartItem={item}
                            onUpdate={(count) => {
                                // Update the cart item count
                            }}
                            onRemove={(itemId) => {
                                // Remove the cart item
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}












type CartItem_Props = {
    cartItem: AppDB_Types["cartItem"]["model"],
    onUpdate: (count: number) => void,
    onRemove: (itemId: string) => void,
}

function CartItem({ cartItem, onUpdate, onRemove }: CartItem_Props) {
    const update = useAPI(async (count: number) => {
        const res = await API_Client.cartItem.update(cartItem.id, count);
        if (res?.body.success) {
            onUpdate(count);
        }
    })

    const remove = useAPI(async () => {
        const res = await API_Client.cartItem.remove(cartItem.id);
        if (res?.body.success) {
            onRemove(cartItem.id);
        }
    })
    
    
    return (
        <article className="overflow-hidden rounded-2xl border border-(--container-background-sub)/70 bg-(--container-background) shadow-sm">
            <div className="flex gap-3 p-3 sm:p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-(--container-background-sub) sm:h-28 sm:w-28">
                    <Image src={cartItem.product.img?.url ?? "/picture.png"} alt={cartItem.product.name} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-bold text-(--text-color)">{cartItem.product.name}</h2>
                            <p className="mt-1 text-sm text-(--text-color-sub)">¥{cartItem.product.price} / 個</p>

                            <p className="mt-1 text-sm text-(--text-color-sub)">
                                {
                                    cartItem.product.isStockAccurate ? (
                                        `在庫: ${cartItem.product.stock}個`
                                    ) : (
                                        `予定在庫数: ${cartItem.product.stock}個`
                                    )
                                }
                                <span hidden={cartItem.count <= cartItem.product.stock} className="text-sm text-red-500">※在庫数が不足しています</span>
                            </p>
                        </div>
                        <p className="shrink-0 font-bold text-(--app-theme)">¥{(cartItem.product.price * cartItem.count).toLocaleString()}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                        <div
                            className={[
                                "flex items-center gap-3 rounded-full border border-(--app-theme-sub) px-1 py-1 transition-colors",
                                update.waiting || remove.waiting ? "bg-(--app-theme-sub) text-(--app-theme-text-sub)" : "bg-(--background) text-(--text-color)"
                            ].join(" ")}
                        >
                        <Button
                            aria-label={cartItem.count > 1 ? "数量を1つ減らす" : "商品を削除"}
                            className="rounded-full p-1 hover:bg-(--app-theme-sub)/20"
                            onClick={() => {
                                if (cartItem.count > 1) {
                                    update.request(cartItem.count - 1);
                                } else {
                                    remove.request();
                                }
                            }}
                        >
                            {
                                cartItem.count > 1 ? <Minus size={17} /> : <Trash size={16} />
                            }
                        </Button>
                        <span className="min-w-5 text-center text-sm font-bold">
                            {cartItem.count}
                        </span>
                        <Button
                            aria-label="数量を1つ増やす"
                            className="rounded-full p-1 hover:bg-(--app-theme-sub)/20"
                            onClick={() => {
                                update.request(cartItem.count + 1);
                            }}
                        >
                            <Plus size={17} />
                        </Button>
                    </div>
                        <Button
                            className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-(--text-color-sub) hover:bg-(--error)/10 hover:text-(--error)"
                            onClick={() => remove.request()}
                        >
                            <Trash size={15} />削除
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}

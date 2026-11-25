"use client"


import { AppView } from "@/libs/element/layout";
import { AppDB_Types } from "@/libs/db";
import React, { Suspense, use, useEffect, useState } from "react";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Content } from "@/libs/element/layout/content";
import { Navigation } from "@/libs/element/layout/navigation";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { View_Header } from "@/libs/element/view/header";
import { useRouter } from "next/navigation";
import { Loading } from "@/libs/element/view/loading";
import { genPromiseProps } from "@/libs/element/view/type.gen";
import { Button } from "@/libs/element/button";
import { Styles } from "@/libs/element/style/style";



type PageView_Props = {
    verifyKey?: Promise<AppDB_Types["userVerifyKey"]["model"] | null>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>
} & AppDB_Types["_custom"]["base"]["model"]


export function PageView({ verifyKey, ...base }: PageView_Props) {


    return (
        <AppView>
            <View_Header {...base} />
            <ContentWrapper>
                <Content>
                    <Suspense fallback={<QRView />}>
                        {
                            verifyKey ?
                            <PromiseQRView verifyKey={verifyKey} /> :
                            <QRView verifyKey={null} />
                        }
                    </Suspense>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}





const LoadingDiv = Loading((p: React.JSX.IntrinsicElements["div"]) => <div {...p} />);


type QRView_Props = {
    verifyKey?: AppDB_Types["userVerifyKey"]["model"] | null
}

function QRView({ verifyKey }: QRView_Props) {
    const router = useRouter();
    
    
    const isLoading = verifyKey === undefined;
    const isNotFound = verifyKey === null;





    const [now, setNow] = useState<number>(() => Date.now());

    useEffect(() => {
        function updateNow() {
            const currentNow = Date.now();
            setNow(currentNow);
            if (verifyKey && currentNow < new Date(verifyKey.expiresAt).getTime()) {
                animationFrameId = requestAnimationFrame(updateNow);
            }
        }
        
        let animationFrameId = requestAnimationFrame(updateNow);

        return () => {
            cancelAnimationFrame(animationFrameId);
        }
    }, [verifyKey]);
    
    
    const timeLeft = verifyKey ? new Date(verifyKey.expiresAt).getTime() - now : 0;
    const remainingSeconds = Math.max(0, Math.floor(timeLeft / 1000));
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const displaySeconds = String(remainingSeconds % 60).padStart(2, "0");
    
    
    return (
        <div className="flex min-h-full items-center justify-center py-8">
            <div className="flex w-full max-w-2xl flex-col items-center gap-5 px-6 py-8 text-center">
                <div className={[
                    isLoading ? `${Styles.loading} bg-(--background-sub)` : "",
                    "size-80 p-5 bg-white"
                ].join(" ")}>
                    {
                        verifyKey &&
                        <QRCodeSVG
                            value={verifyKey.key}
                            className="w-full h-full"
                        />
                    }
                </div>
                <div>
                    {
                        isLoading ? "読み込み中..." :
                        isNotFound ? "認証キーがありません" :
                        `有効期限: ${remainingMinutes}:${displaySeconds}`
                    }
                </div>
                {
                    !isLoading && !isNotFound && timeLeft <= 0 &&
                    <div>
                        認証キーの有効期限が切れました。<br/>
                        <p>ページを更新して新しい認証キーを取得してください。</p>
                    </div>
                }
            </div>
        </div>
    )
}


function PromiseQRView({ verifyKey }: genPromiseProps<QRView_Props, "verifyKey">) {
    const data = use(verifyKey);
    
    return <QRView verifyKey={data} />
}
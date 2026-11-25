"use client"


import { AppDB_Types } from "@/libs/db";
import { Button } from "@/libs/element/button";
import { AppView } from "@/libs/element/layout";
import { Content } from "@/libs/element/layout/content";
import { ContentWrapper } from "@/libs/element/layout/contentWrapper";
import { Navigation } from "@/libs/element/layout/navigation";
import { Popup } from "@/libs/element/popup";
import { useCamera } from "@/libs/element/state/useCamera";
import { useQR_Reader } from "@/libs/element/state/useQR_Reader";
import { useVideo } from "@/libs/element/state/useVideo";
import { View_Header } from "@/libs/element/view/header";
import { ScanLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
    store: Promise<AppDB_Types["store"]["model"] | null>,
    user?: Promise<AppDB_Types["user"]["detailMin"] | null>

} & AppDB_Types["_custom"]["base"]["model"]

export function PageView({ store, user, ...base }: Props) {
    const [showQR_Reader, setShowQR_Reader] = useState(false);
    
    const video = useRef<HTMLVideoElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState(0);
    const camera = useCamera();
    const qr = useQR_Reader(canvas, (code) => {
        setShowQR_Reader(false);
        camera.stopCamera();
    }, true);
    useVideo(video, (video) => {
        const minSize = Math.min(video.videoWidth, video.videoHeight);
        setSize(minSize);
        
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d");
            const px = (video.videoWidth - minSize) / 2;
            const py = (video.videoHeight - minSize) / 2;
            if (ctx) {
                ctx.drawImage(video, px, py, minSize, minSize, 0, 0, minSize, minSize);
                qr.readQRCode();
            }
        }
    });
    useEffect(() => {
        if (video.current && camera.media) {
            video.current.srcObject = camera.media;
            video.current.play();
        }
    }, [camera]);




    const [orders, setOrders] = useState<AppDB_Types["order"]["model"][]>([]);

    useEffect(() => {
        if (qr.qrText) {
            
        }
    }, [qr.qrText]);
    
    
    return (
        <AppView>
            <View_Header {...base} user={user} />
            <ContentWrapper>
                <Content>
                    <Button
                        onClick={() => {
                            setShowQR_Reader(true)
                            camera.startCamera();
                            qr.clearResult();
                        }}
                    >
                        表示
                    </Button>
                    <Popup hidden={!showQR_Reader} className="z-50 flex flex-col gap-5 bg-(--app-theme-sub)/95 px-6">
                        <div className="w-full max-w-sm text-center text-(--app-theme-text)">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--primary)">
                                <ScanLine size={25} aria-hidden="true" />
                            </div>
                            <h2 className="text-xl font-bold">QRコードを読み取る</h2>
                            <p className="mt-1 text-sm opacity-75">注文者のQRコードを枠内に合わせてください</p>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl bg-(--container-background) p-3 shadow-2xl">
                            <video ref={video} autoPlay playsInline className="absolute h-0 w-0 opacity-0" hidden/>
                            <canvas ref={canvas} width={size} height={size} className="h-auto w-full max-w-sm rounded-xl"/>
                        </div>
                        <Button
                            className="w-full max-w-sm rounded-xl bg-(--container-background) px-4 py-3 text-base font-bold text-(--text-color) shadow-md"
                            onClick={() => {
                                setShowQR_Reader(false);
                                camera.stopCamera();
                                qr.clearResult()
                            }}
                        >
                            閉じる
                        </Button>
                    </Popup>
                </Content>
                <Navigation />
            </ContentWrapper>
        </AppView>
    )
}
import { AppDB_Types } from "@/libs/db"
import { genPromiseProps } from "../../type.gen"
import { Styles } from "@/libs/element/style/style"
import React, { use } from "react"
import Link from "next/link"
import { Loading } from "../../loading"

type Props = {
    store?: AppDB_Types["store"]["model"] | null
}

export const View_StoreHeader = {
    View({ store }: Props) {
        const isLoading = store === undefined;
        const isNotFound = store === null;

        return (
            <div>
                <div>
                    <h2
                        className={[
                            isLoading ? Styles.loadingText : "",
                            "text-2xl font-bold text-(--text-color) bg-(--background-sub)"
                        ].join(" ")}
                    >
                        {
                            isNotFound ? "店舗が見つかりません" : store?.name
                        }
                    </h2>
                </div>

                <LoadingDiv className="flex justify-center gap-2">
                    {
                        store &&
                        <>
                            <Link href={`/store/${store.id}`}>
                                ホーム
                            </Link>
                            <Link href={`/store/${store.id}/product`}>
                                すべての商品
                            </Link>
                            <Link href={`/store/${store.id}/page`}>
                                記事
                            </Link>
                        </>
                    }
                </LoadingDiv>
            </div>
        )
    },
    PromiseView({ store }: genPromiseProps<Props, "store">) {
        const data = use(store);

        return <View_StoreHeader.View store={data} />
    }
}


const LoadingDiv = Loading((p: React.JSX.IntrinsicElements["div"]) => <div {...p} />)
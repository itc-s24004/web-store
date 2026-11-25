import { AppDB_Types } from "@/libs/db"
import { Styles } from "@/libs/element/style/style"
import Image from "next/image"
import { genPromiseProps } from "../../type.gen"
import { use } from "react"

type View_Panel_Props = {
    productGroup?: AppDB_Types["productGroup"]["model"],
    userLangId?: string | null
}


export const View_Panel_ProductGroup = {
    View({ productGroup }: View_Panel_Props) {
        return (
            <div className={[
                productGroup === undefined ? Styles.loading : "",
                "size-80 bg-(--background-sub) relative"
            ].join(" ")}>
                {productGroup?.img?.url && (
                    <Image src={productGroup.img.url} alt={productGroup.name} className="object-cover w-full h-full" width={320} height={320} loading="lazy"/>
                )}
                {productGroup?.name && (
                    <h2 className="absolute bottom-2 left-2 text-xl bg-black text-white p-1">{productGroup.name}</h2>
                )}
            </div>
        )
    },
    PromiseView({ productGroup, userLangId }: genPromiseProps<View_Panel_Props, "productGroup">) {
        const pg = use(productGroup)
        
        return <View_Panel_ProductGroup.View productGroup={pg} userLangId={userLangId} />
    }
}
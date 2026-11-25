import { AppDB_Types } from "@/libs/db"
import { Styles } from "@/libs/element/style/style"
import Image from "next/image"

type View_Props = {
    productGroup: AppDB_Types["productGroup"]["model"]
    className?: string
}

export function View_Card_ProductGroup({ productGroup, className }: View_Props) {
    return (
        <div className={["flex p-2 bg-(--background)", className].join(" ")}>
            <div className="size-30">
                {productGroup.img && <Image src={productGroup.img.url} alt={productGroup.name} width={100} height={100} className="w-full aspect-square"/>}
            </div>
            <div>
                <h2>{productGroup.name}</h2>
                
            </div>
        </div>
    )
}
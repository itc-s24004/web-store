import { AppDB_Types } from "@/libs/db"
import { Styles } from "@/libs/element/style/style"
import Image from "next/image"
import Link from "next/link"

type Props = {
    product?: AppDB_Types["product"]["model"],
    userLangId?: string,
    titleLink?: boolean
}

export function View_Card_Product({ product, userLangId, titleLink }: Props) {
    return (
        <div className="p-2 bg-(--background) rounded-md">
            <div className="w-50 flex flex-col gap-2 ">
                <div className={[
                    "w-full aspect-square bg-(--background-sub) relative",
                    product === undefined ? Styles.loading : ""
                ].join(" ")}>
                    {product?.img?.url && (
                        <Image src={product.img.url} alt={product.name} className="object-cover w-full h-full" width={300} height={300}/>
                    )}
                </div>
                <div className={product === undefined ? "opacity-0" : "opacity-100"}>
                    <h2 className="text-2xl font-bold text-(--text-color) min-h-lh">
                        {
                            titleLink ?
                            <Link href={`/product/${product?.id}`} className="hover:underline">
                                {product?.name}
                            </Link> :
                            product?.name
                        }
                    </h2>
                    <p className="text-sm text-(--text-color) min-h-lh">{product?.price}</p>
                </div>
            </div>
        </div>
    )
}
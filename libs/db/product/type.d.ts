import { Prisma } from "@/libs/generated/prisma/client";


type Model_ProductUpdate = Partial<
    Prisma.ProductGetPayload<{
        select: {
            name: true,
            description: true,
            price: true,
            isStockAccurate: true,
            stock: true,

            imgId: true,
        }
    }>
>



type Model_Product = Prisma.ProductGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isStockAccurate: true,
        img: {
            select: {
                url: true
            }
        },
        langMaps: {
            select: {
                name: true,
                description: true,
                langId: true
            }
        }
    }
}>


type Model_ProductDetail = Prisma.ProductGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isStockAccurate: true,
        
        store: {
            select: {
                id: true,
                name: true,
                langMaps: {
                    select: {
                        langId: true,
                        name: true
                    }
                }
            }
        },
        img: {
            select: {
                url: true
            }
        },
        items: {
            select: {
                productGroup: {
                    select: {
                        id: true,
                        name: true,
                        showTop: true,

                        img: {
                            select: {
                                url: true
                            }
                        },
                        langMaps: {
                            select: {
                                name: true,
                                langId: true
                            }
                        }
                    }
                }
            }
        }
        langMaps: {
            select: {
                id: true,
                name: true,
                description: true,
                langId: true
            }
        }
    }
}>


type Model_ProductEdit = Prisma.ProductGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isStockAccurate: true,
        stock: true,

        img: {
            select: {
                id: true,
                url: true
            }
        },
        
        langMaps: {
            select: {
                id: true,
                name: true,
                description: true,
                langId: true
            }
        }
    }
}>



export type models = {
    update: Model_ProductUpdate,
    model: Model_Product,
    detail: Model_ProductDetail,
    edit: Model_ProductEdit
}
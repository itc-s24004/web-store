import { Prisma } from "@/libs/generated/prisma/client"





type Model_ProductUpdate = Partial<
    Prisma.ProductGroupGetPayload<{
        select: {
            name: true,
            showTop: true,

            imgId: true
        }
    }>
>



type Model_ProductGroup = Prisma.ProductGroupGetPayload<{
    select: {
        id: true,
        name: true,

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
}>


type Model_ProductGroupDetail = Prisma.ProductGroupGetPayload<{
    select: {
        id: true,
        name: true,
        showTop: true,

        img: {
            select: {
                url: true
            }
        },

        items: {
            select: {
                product: {
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
                }
            }
        }
    }
}>

type Model_ProductDisplay = Prisma.ProductGroupGetPayload<{
    select: {
        id: true,
        name: true,
        showTop: true,

        img: {
            select: {
                url: true
            }
        },
        
        items: {
            select: {
                product: {
                    select: {
                        name: true,

                        img: {
                            select: {
                                url: true
                            }
                        }
                    }
                }
            }
        }

        _count: {
            select: {
                items: true
            }
        }
    }
}>



type Model_ProductGroup_Edit = Prisma.ProductGroupGetPayload<{
    select: {
        id: true,
        name: true,
        showTop: true,

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
                langId: true
            }
        }
    }
}>




export type models = {
    update: Model_ProductUpdate,
    model: Model_ProductGroup,
    detail: Model_ProductGroupDetail,
    deisplay: Model_ProductDisplay,

    edit: Model_ProductGroup_Edit
}
import { Prisma } from "@/libs/generated/prisma/client";

type Model_Store = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
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

type Model_Edit = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,

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
                description: true
            }
        }
    }
}>


type Model_Update = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
        
        imgId: true
    }
}>

type Model_Detail = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        description: true,
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
        },
        productGroups: {
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
        }
    }
}>



export type models = {
    update: Model_Update,
    model: Model_Store,
    detail: Model_Detail,
    edit: Model_Edit
}
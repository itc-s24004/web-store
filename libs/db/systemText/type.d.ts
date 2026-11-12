import { Prisma } from "@/libs/generated/prisma/client";

type Model_SystemText = Prisma.SystemTextGetPayload<{
    select: {
        text: true,
        langMaps: {
            select: {
                text: true,
                langId: true
            }
        }
    }
}>

type Model_SystemTextDetail = Prisma.SystemTextGetPayload<{
    select: {
        id: true,
        text: true,
        langMaps: {
            select: {
                id: true,
                text: true,
                langId: true
            }
        }
    }
}>


export type models = {
    model: Model_SystemText,
    detail: Model_SystemTextDetail
}
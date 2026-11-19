import { Prisma } from "@/libs/generated/prisma/client";

type Model_Staff = Prisma.StaffGetPayload<{
    select: {
        id: true,
        storeId: true,
        isOwner: true,
        user: {
            select: {
                id: true,
                email: true
            }
        }
    }
}>

type Model_Edit = Prisma.StaffGetPayload<{
    select: {
        id: true,
        userId: true,
        isOwner: true
    }
}>


export type models = {
    model: Model_Staff,
    edit: Model_Edit
}
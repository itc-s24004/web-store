import { AppDB_Types } from "..";
import { db } from "../db";

export function add(storeId: string, userId: string, isOwner: boolean): Promise<AppDB_Types["staff"]["edit"]> {
    return db.staff.upsert({
        where: {
            storeId_userId: {
                storeId,
                userId
            }
        },
        create: {
            storeId,
            userId,
            isOwner
        },
        update: {
            isOwner
        }
    })
}

export function add_email(storeId: string, email: string, isOwner: boolean): Promise<AppDB_Types["staff"]["edit"]> {
    return db.staff.upsert({
        where: {
            storeId_userId: {
                storeId,
                userId: email
            }
        },
        create: {
            store: {
                connect: {
                    id: storeId
                }
            },
            user: {
                connect: {
                    email
                }
            },
            isOwner
        },
        update: {
            isOwner
        }
    })
}

export function update(storeId: string, userId: string, isOwner: boolean): Promise<AppDB_Types["staff"]["edit"]> {
    return db.staff.update({
        where: {
            storeId_userId: {
                storeId,
                userId
            }
        },
        data: {
            isOwner
        }
    })
}


export function remove(storeId: string, userId: string) {
    return db.staff.delete({
        where: {
            storeId_userId: {
                storeId,
                userId
            }
        },
        select: {
            id: true
        }
    })
}


export function get(storeId: string, email: string) {
    return db.staff.findFirst({
        where: {
            storeId,
            user: {
                email
            }
        }
    })
}
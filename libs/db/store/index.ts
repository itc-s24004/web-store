import { cacheTag } from "next/cache";
import { db } from "../db";
import { models } from "./type";


export async function add(name: string, description: string): Promise<models["edit"]> {
    return db.store.create({
        data: {
            name,
            description
        },
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
                    description: true,
                    langId: true
                }
            }
        }
    })
}



export async function get(id: string): Promise<models["model"] | null> {
    return db.store.findUnique({
        where: {
            id
        },
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
    })
}

export const model = {
    get(id: string): Promise<models["model"] | null> {
        return db.store.findUnique({
            where: {
                id
            },
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
        })
    },
    async getCache(id: string): Promise<models["model"] | null> {
        "use cache"
        cacheTag(...genCacheTag(id))
        
        return model.get(id);
    }
}


export const detail = {
    get(id: string): Promise<models["detail"] | null> {
        return db.store.findUnique({
            where: {
                id
            },
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
        })
    },
    async getCache(id: string): Promise<models["detail"] | null> {
        "use cache"
        cacheTag(...genCacheTag(id))
        
        return detail.get(id);
    }
}

function genCacheTag(id?: string) {
    return id ? ["db-store", `db-store-${id}`] : ["db-store"];
}



export async function getDetail(id: string): Promise<models["detail"] | null> {
    return db.store.findUnique({
        where: {
            id
        },
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
    })
}


export async function update(id: string, data: models["update"]) {
    return db.store.update({
        where: {
            id
        },
        data,
        select: {
            id: true
        }
    })
}


export async function remove(id: string) {
    return db.store.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}



export type { models } from "./type"
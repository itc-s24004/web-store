import { cacheTag } from "next/cache";
import { getCache } from "../_custom/base";
import { db } from "../db";
import { models } from "./type";


export const model = {
    get(): Promise<models["model"][]> {
        return db.productGroup.findMany({
            where: {
                showTop: true
            },
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
        })
    },
    async getCache(): Promise<models["model"][]> {
        "use cache"
        cacheTag(...genCacheTag())
        
        return model.get();
    }
}

function genCacheTag(id?: string) {
    return id ? ["db-productGroup", `db-productGroup-${id}`] : ["db-productGroup"];
}


export async function getAll(): Promise<models["model"][]> {
    return db.productGroup.findMany({
        where: {
            showTop: true
        },
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
    })
}


export const detail = {
    get(id: string): Promise<models["detail"] | null> {
        return db.productGroup.findUnique({
            where: {
                id
            },
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
        })
    },
    async getCache(id: string): Promise<models["detail"] | null> {
        "use cache"
        cacheTag(...genCacheTag(id))
        
        return detail.get(id);
    }
}



export async function getDetail(id: string): Promise<models["detail"] | null> {
    return db.productGroup.findUnique({
        where: {
            id
        },
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
    })
}



export async function add(storeId: string, name: string, showTop?: boolean, imgId?: string): Promise<models["edit"]> {
    return db.productGroup.create({
        data: {
            storeId,
            name,
            showTop,
            imgId
        },
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
    })
}

export async function remove(find: findParams) {
    return db.productGroup.delete({
        where: find,
        select: {
            id: true,
        }
    })
}




type findParams = {
    id: string,
    storeId?: string
}

export async function update(find: findParams, data: models["update"]) {
    return db.productGroup.update({
        where: find,
        data,
        select: {
            id: true
        }
    })
}



export async function getEdit(): Promise<models["edit"][]> {
    return db.productGroup.findMany({
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
    })
}




export async function getDisplay(): Promise<models["deisplay"][]> {
    return db.productGroup.findMany({
        where: {
            showTop: true
        },
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
            },

            _count: {
                select: {
                    items: true
                }
            }
        }
    })
}



export type { models } from "./type"
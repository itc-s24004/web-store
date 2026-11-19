import { db } from "../db";
import { models } from "./type";

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
            },

            _count: {
                select: {
                    items: true
                }
            }
        }
    })
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
            
            products: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    showStockDetail: true,
                    price: true,
                    stock: true,

                    img: {
                        select: {
                            url: true
                        }
                    },
                    label: {
                        select: {
                            body: true,
                            color: true
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
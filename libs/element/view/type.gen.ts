type ElementPropsType = Record<string, unknown>

export type genPromiseProps<P extends ElementPropsType, target extends keyof P = never> = RequireKeys<{
    [K in keyof P]: K extends target ? Promise<P[K]> : P[K]
}, target>

type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
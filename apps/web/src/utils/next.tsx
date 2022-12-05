export type GenerateStaticParams<
    Prev extends Record<string, string>,
    New extends Record<string, string>,
> = (params: Prev) => Promise<New[]>

export type InferGenerateStaticParams<
    T extends GenerateStaticParams<
        any, 
        any
    >
> = Awaited<ReturnType<T>>[number]
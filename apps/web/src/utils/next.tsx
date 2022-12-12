import type { FC, PropsWithChildren, ReactElement, WeakValidationMap, ValidationMap, ReactNode } from "react"

// A fix for React 18 currently not supporting async components with typescript...
export type PropsWithAsyncChildren<P extends Object = {}> = P & { children?: ReactNode | Promise<ReactNode> | undefined };

interface AsyncFunctionComponent<P extends Object = {}> {
    (props: P, context?: any): Promise<ReactElement<any, any> | null>;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

export type AsyncFC<P extends Object = {}> = AsyncFunctionComponent<P>;

export type OptionalAsyncFC<P extends Object = {}> = AsyncFC<P> | FC<P>

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

export type WithParams<
    Props extends Object, 
    Params extends Object = {}, 
    SearchParams extends Object = {}
> = Props & {
    params: Params,
    searchParams: SearchParams,
}

export type NextPage<
    Params extends object = {}, 
    SearchParams extends object = {},
    Props extends Object = {}, 
> = OptionalAsyncFC<WithParams<Props, Params, SearchParams>>

export type NextLayout<
    Params extends object = {}, 
    SearchParams extends object = {},
    Props extends Object = {}, 
> = OptionalAsyncFC<WithParams<PropsWithChildren<Props>, Params, SearchParams>>



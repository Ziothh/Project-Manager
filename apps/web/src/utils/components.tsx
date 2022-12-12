
// prettier-ignore

import { Component, FC, Suspense } from "react"

export const withSuspense = <Props = {},>(
    Component: React.FC<Props>, 
    SuspenseFallback: React.FC,
): FC<Props> => (props: Props) => (
    <Suspense fallback={<SuspenseFallback/>}>
        {/* @ts-ignore */}
        <Component {...props} />
    </Suspense>
)

/** A higher order function that wraps a given component in a given context provider. */
export const withWrapper = <Props = {},>(
    Component: React.FC<Props>, 
    WrapperComponent: React.FC<React.PropsWithChildren<any>>,
    ): React.FC<Props> => (props) => (
    <WrapperComponent>
        {/* @ts-ignore */}
        <Component {...props}/>
    </WrapperComponent>
)

export const withContext = <Props = {},>(
    Component: React.FC<Props>, 
    ContextProvider: React.FC<React.PropsWithChildren<any>>,
): React.FC<Props> => withWrapper(Component, ContextProvider)
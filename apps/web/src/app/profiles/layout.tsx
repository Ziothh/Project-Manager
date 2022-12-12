"use client"

import { PropsWithChildren, Suspense } from "react"

interface Props {
    
}


const layout: React.FC<PropsWithChildren<Props>> = ({
    children
}) => {
    return (
        <Suspense fallback={<p>Loading profile...</p>}>
            {children}
        </Suspense>
    )
}


export default layout
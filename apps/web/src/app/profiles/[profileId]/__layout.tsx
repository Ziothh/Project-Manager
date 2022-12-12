"use client"

import { PropsWithChildren } from "react"
import { withContext } from "~/utils/components"
import { ProfileContext, useProfileCtx } from "./ProfileContext"

interface Props {
    
}


const layout = withContext<PropsWithChildren<Props>>(({children}) => {
    const {currentProfile} = useProfileCtx()

    if (!currentProfile) return null

    return (
        <>
            {children}
        </>
    )
}, ProfileContext)


export default layout
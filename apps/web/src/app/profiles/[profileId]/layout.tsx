"use client"

import { PropsWithChildren } from "react"
import { ProfileContext } from "./ProfileContext"

interface Props {
    
}


const layout: React.FC<PropsWithChildren<Props>> = ({children}) => {
    return (
        <ProfileContext>
            {children}
        </ProfileContext>
    )
}


export default layout
"use client"

import clsx from "clsx"
import { PropsWithChildren } from "react"
import { ClientProvider } from "~/utils/trpc"
import Document from "./Document"

import "../styles/globals.scss";

interface Props {
    
}


const RootLayout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div
        className={clsx(
            // App level styles
            'flex h-screen overflow-hidden text-ink select-none cursor-default bg-gray-850',
            // 'rounded-[10px] has-blur-effects',
            // os === 'macOS' && 'rounded-[10px] has-blur-effects',
            // os !== 'browser' && os !== 'windows' && 'border border-app-frame'
        )}
        // onContextMenu={(e) => {
        //     // TODO: allow this on some UI text at least / disable default browser context menu
        //     // Prevents right click
        //     // e.preventDefault();
        //     return false;
        // }}
        >
            {children}   
        </div>
    )
}


export default (props: any) => (
    <ClientProvider>
        <Document>
            <RootLayout {...props}/>
        </Document>
    </ClientProvider>
) as unknown as typeof RootLayout
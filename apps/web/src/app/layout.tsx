"use client"

import clsx from 'clsx';
import { FC, PropsWithChildren, Suspense } from 'react';
import { ClientProvider, trpc } from '~/utils/trpc';
// import {} from "@"
import "../styles/globals.scss"

// import { Sidebar } from './components/layout/Sidebar';
// import { Toasts } from './components/primitive/Toasts';
// import { useOperatingSystem } from './hooks/useOperatingSystem';

const AppLayout: FC<PropsWithChildren> = ({children}) => {
	// const os = useOperatingSystem();

	return (<>
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Project Manager</title>
        </head>
        <body>
            <div
            className={clsx(
                // App level styles
                'flex h-screen overflow-hidden text-ink select-none cursor-default',
                // 'rounded-[10px] has-blur-effects',
                // os === 'macOS' && 'rounded-[10px] has-blur-effects',
                // os !== 'browser' && os !== 'windows' && 'border border-app-frame'
            )}
            onContextMenu={(e) => {
                // TODO: allow this on some UI text at least / disable default browser context menu
                // Prevents right click
                // e.preventDefault();
                return false;
            }}
            >
                {/* <Sidebar /> */}
                <div className="relative flex w-full bg-gray-850">
                    <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
                        {children}
                    </Suspense>
                </div>
                {/* <Toasts /> */}
            </div>
        </body>
        </html>
    </>);
}

export default (props) => (
    <ClientProvider>
        <AppLayout {...props}/>
    </ClientProvider>
)
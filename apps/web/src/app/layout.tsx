"use client"

import clsx from 'clsx';
import { FC, PropsWithChildren, Suspense } from 'react';
import { Sidebar } from '~/components/layout/Sidebar';
import { ClientProvider, trpc } from '~/utils/trpc';
// import {} from "@"
import "../styles/globals.scss"
import { AppContext } from '../features/global/context/AppContext';
import Document from './Document';

// import { Sidebar } from './components/layout/Sidebar';
// import { Toasts } from './components/primitive/Toasts';
// import { useOperatingSystem } from './hooks/useOperatingSystem';

const AppLayout: FC<PropsWithChildren> = ({children}) => {
	// const os = useOperatingSystem();

	return (<>
        <AppContext>
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
                <Sidebar />

                <div className="relative flex w-full bg-gray-850">
                    <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
                        {children}
                    </Suspense>
                </div>
                {/* <Toasts /> */}
            </div>
        </AppContext>
    </>);
}

export default (props: any) => (
    <ClientProvider>
        <Document>
            <AppLayout {...props}/>
        </Document>
    </ClientProvider>
) as unknown as typeof AppLayout
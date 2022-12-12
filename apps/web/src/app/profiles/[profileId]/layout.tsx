"use client"

import { createContext, FC, PropsWithChildren, Suspense } from 'react';
import { Sidebar } from '~/components/layout/Sidebar';
import { ProfileContext } from '~/features/global';
import { NextLayout } from '~/utils/next';
import { AppContextProvider } from './AppContext';
// import {} from "@"
import { ProfilePageParams } from './page';

// import { Sidebar } from './components/layout/Sidebar';
// import { Toasts } from './components/primitive/Toasts';
// import { useOperatingSystem } from './hooks/useOperatingSystem';



const layout: NextLayout<ProfilePageParams> = ({children, params}) => {
	// const os = useOperatingSystem();
    

	return (<>
        <AppContextProvider value={params}>
            <ProfileContext>
                <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
                    <Sidebar profileId={params.profileId} />

                    <div className="relative flex w-full">
                            {children}
                    </div>
                    {/* <Toasts /> */}
                </Suspense>
            </ProfileContext>
        </AppContextProvider>
    </>);
}

export default layout
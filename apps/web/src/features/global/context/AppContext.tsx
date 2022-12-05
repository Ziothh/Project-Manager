import {contextFactory} from "@ziothh/react-hooks"
import { useMemo, useState } from "react"
import { RouterOutputs, trpc } from "~/utils/trpc"
import { usePathname, useRouter, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import ROUTES from "~/constants/routes";

type TQueriedProfile = RouterOutputs["profile"]["getAll"][number];

export type AppCtx = ReturnType<typeof useAppCtx>

export const[AppContext, useAppCtx] = contextFactory(() => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    console.debug({
        pathName,
        searchParams,
        test: searchParams.entries(),
        layoutSegment: useSelectedLayoutSegment(),
        layoutSegments: useSelectedLayoutSegments(),
    })

    const allProfilesQuery = trpc.profile.getAll.useQuery(undefined, {
        onSuccess(data) {
            setCurrentProfile(data[0] ?? null)        
        },
    })

    // const [, ] = useState<TQueriedProfile | null>(null)




    
    const currentProfile = useMemo(
        () => {
            return allProfilesQuery.data?.find(p => p.id === p.id /* todo */) ?? null
        }, 
        [pathName, searchParams]
    )

    const setCurrentProfile = (
        profile: Pick<NonNullable<typeof currentProfile>, "id"> | null
    ) => {
        // const foundProfile = allProfilesQuery.data
        router.push(
            profile === null
            ? ROUTES.home
            : ROUTES.profile(profile.id)
        )
    }

    return {
        allProfilesQuery,
        currentProfile,
        setCurrentProfile,
    }
}) 
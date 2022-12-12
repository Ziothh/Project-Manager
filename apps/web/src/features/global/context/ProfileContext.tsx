import {contextFactory} from "@ziothh/react-hooks"
import { useMemo, useState } from "react"
import { RouterOutputs, trpc } from "~/utils/trpc"
import { usePathname, useRouter, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import ROUTES from "~/constants/routes";
import { useAppCtx } from "~/app/profiles/[profileId]/AppContext";

type TQueriedProfile = RouterOutputs["profile"]["getAll"][number];

type ProfileCtx = ReturnType<typeof useProfileCtx>

export const[ProfileContext, useProfileCtx] = contextFactory(() => {
    const allProfilesQuery = trpc.profile.getAll.useQuery(undefined, {
        // onSuccess(data) {
        //     // setCurrentProfile(data[0] ?? null)        
        //     const profile = data[0] ?? null

        //     // router.push(
        //     //     profile === null
        //     //     ? ROUTES.home
        //     //     : ROUTES.profile(profile.id)
        //     // )
        // },
        suspense: true,
    })

    const {profileId} = useAppCtx()

    const currentProfile = useMemo(() => {
        return allProfilesQuery.data!.find(p => p.id === profileId)!
    }, [allProfilesQuery.data, profileId])

    // const currentProfile = useMemo(
    //     () => {
    //         return allProfilesQuery.data?.find(p => p.id === p.id /* todo */) ?? null
    //     }, 
    //     [pathName, searchParams]
    // )



 

    // const [, ] = useState<TQueriedProfile | null>(null)




    

    // type TSetProfileType = Pick<NonNullable<typeof currentProfile>, "id"> | null
    // const setCurrentProfile = (
    //     profile: TSetProfileType | ((prev: TSetProfileType) => TSetProfileType)
    // ) => {
    //     const actualProfile = typeof profile === "function"
    //     ? profile(currentProfile)
    //     : profile

    //     // const foundProfile = allProfilesQuery.data
    //     router.push(
    //         actualProfile === null
    //         ? ROUTES.home
    //         : ROUTES.profile(actualProfile.id)
    //     )
    // }

    return {
        allProfilesQuery,
        currentProfile,
        setCurrentProfile: (...args: any) => alert("not implemented"),
    }
}) 
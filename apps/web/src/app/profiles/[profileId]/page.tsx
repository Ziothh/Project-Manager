"use client"

import { Profile } from "@prisma/client";
import { ProfileContext } from "~/features/global";
import { prisma } from "~/server/db/client";
import { withContext } from "~/utils/components";
import { GenerateStaticParams, InferGenerateStaticParams, NextPage } from "~/utils/next";
import { trpc } from "~/utils/trpc";
import Temp from "./Temp";
// import {} from "next/navigation"

export interface ProfilePageParams {
    profileId: string
}
interface Props {
    
}


const page: NextPage<ProfilePageParams> = ({params}) => {
    // trpc.profile.getAll.useQuery({}, {
    //     suspense: true,
        
    // })

    return (
        <div>
            <h1>Profile {params.profileId}</h1>
            <button>Test button</button>
            {/* <Temp/> */}
        </div>
    )
}



// export const generateStaticParams = (async ({}) => {
//     const profiles = await prisma.profile.findMany({
        
//     });

//     // const profiles = await trpc.useContext().profile.getAll.fetch()
  
//     return profiles.map((p) => ({
//         profileId: p.id,
//     }));
// }) satisfies GenerateStaticParams<{test: string}, {profileId: Profile["id"]}>

// export type ProfilePageStaticParams = InferGenerateStaticParams<typeof generateStaticParams>

export default page

// export default withContext(
//     page,
//     ProfileContext
// )
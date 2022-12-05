import { Profile } from "@prisma/client";
import { prisma } from "~/server/db/client";
import { GenerateStaticParams, InferGenerateStaticParams } from "~/utils/next";
import { trpc } from "~/utils/trpc";
import Temp from "./Temp";
// import {} from "next/navigation"

interface Props {
    
}


const page: React.FC<Props> = ({}) => {



 
    return (
        <div>
            Profile

            <Temp/>
        </div>
    )
}



export const generateStaticParams = (async ({}) => {
    const profiles = await prisma.profile.findMany({
        
    });

    // const profiles = await trpc.useContext().profile.getAll.fetch()
  
    return profiles.map((p) => ({
        profileId: p.id,
    }));
}) satisfies GenerateStaticParams<{test: string}, {profileId: Profile["id"]}>

export type ProfilePageStaticParams = InferGenerateStaticParams<typeof generateStaticParams>

export default page
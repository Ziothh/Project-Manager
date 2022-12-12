"use client"

import Link from "next/link";
import ROUTES from "~/constants/routes";
import { trpc } from "~/utils/trpc"

interface Props {
    
}

const styleMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
}


const homePage: React.FC<Props> = ({}) => {
    const {data, isLoading} = trpc.profile.getAll.useQuery({
        // projectRootId: "clav2t9zz0000xr6coyoommcl",
    }); 

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="my-auto mx-auto">
            <h1 className="text-center mb-6 text-lg font-bold">Choose a profile</h1>
            <div className={`grid ${styleMap[data?.length ?? 0] ?? "grid-cols-4"} gap-4`}>
                {data?.map(p => (
                    <Link key={p.id} href={ROUTES.profile(p.id)} className="border border-gray-500 rounded-md p-8">
                        <h2>{p.name}</h2>
                    </Link>
                ))}
            
            </div>
        </div>
    )
}


export default homePage
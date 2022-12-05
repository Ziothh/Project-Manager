"use client"

import { trpc } from "~/utils/trpc";
import { useProfileCtx } from "./ProfileContext";

interface Props {
    
}


const Temp: React.FC<Props> = ({}) => {
    const hello = trpc.project.getAll.useQuery({
        projectRootId: useProfileCtx().currentProfile.id,
    }); 

    return (
        <pre>
            {JSON.stringify(hello.data, null, 4)}
        </pre>
    )
}


export default Temp
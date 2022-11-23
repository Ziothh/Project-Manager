"use client"

import { trpc } from "~/utils/trpc"

interface Props {
    
}


const homePage: React.FC<Props> = ({}) => {
    const hello = trpc.project.getAll.useQuery();
    

    return (
        <div>
            Home
            <pre>
            {JSON.stringify(hello.data!, null, 4)}
            </pre>
        </div>
    )
}


export default homePage
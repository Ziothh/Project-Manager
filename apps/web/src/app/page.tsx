"use client"

import { trpc } from "~/utils/trpc"

interface Props {
    
}


const homePage: React.FC<Props> = ({}) => {
    // const hello = trpc.project.getAll.useQuery({
    //     projectRootId: "clav2t9zz0000xr6coyoommcl",
    // }); 

    return (
        <div>
            Loading...
            <pre>
            {/* {JSON.stringify(hello.data!, null, 4)} */}
            </pre>
        </div>
    )
}


export default homePage
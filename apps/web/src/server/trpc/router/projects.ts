import {projects} from "@workspace/core"
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const projectRouter = router({
    // hello: publicProcedure
    //     .input(z.object({ text: z.string().nullish() }).nullish())
    //     .query(({ input }) => {
    //     return {
    //         greeting: `Hello ${input?.text ?? "world"}`,
    //     };
    //     }),
    getAll: publicProcedure.query(({ ctx }) => {
        return projects.listProjects("/Users/digitalastronaut/Websites/websites")
    }),
});

export default projectRouter
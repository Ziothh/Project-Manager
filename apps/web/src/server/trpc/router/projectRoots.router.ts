import { PROJECT_ROOT_VALIDATORS } from "~/shared/validators";

import { publicProcedure, router } from "../trpc";

const projectRootRouter = router({
    // Queries
    getAll: publicProcedure
    .input(PROJECT_ROOT_VALIDATORS.getAll())
    .query(({ ctx, input }) => {
        // return projects.listProjects("/Users/digitalastronaut/Websites/websites")
        return ctx.prisma.projectRoot.findMany({
            where: {...input}
        })
    }),
    getOne: publicProcedure
    .input(PROJECT_ROOT_VALIDATORS.getOne())
    .query(({
        input,
        ctx
    }) => {
        return ctx.prisma.projectRoot.findFirst({where: input})
    }),

    // Mutations
    create: publicProcedure
    .input(PROJECT_ROOT_VALIDATORS.create())
    .mutation(async ({
        ctx, 
        input
    }) => {
        // const root = await ctx.prisma.projectRootRoot.findFirstOrThrow({
        //     where: {
        //         id: projectRootId,
        //     }
        // })

        return ctx.prisma.projectRoot.create({
            data: {
                ...input,
                
            }
        })
    })
});

export default projectRootRouter
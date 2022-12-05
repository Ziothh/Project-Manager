import {projects} from "@workspace/core"
import { resolve } from "path";
import { z } from "zod";
import { PROFILE_VALIDATORS } from "~/shared/validators";

import { router, publicProcedure } from "../trpc";

const profileRouter = router({
    // Queries
    getAll: publicProcedure.query(({ ctx }) => {
        // return projects.listProjects("/Users/digitalastronaut/Websites/websites")
        return ctx.prisma.profile.findMany()
    }),
    getOne: publicProcedure
    .input(PROFILE_VALIDATORS.getOne())
    .query(({
        input,
        ctx
    }) => {
        return ctx.prisma.profile.findFirst({where: input})
    }),

    // Mutations
    create: publicProcedure
    .input(PROFILE_VALIDATORS.create())
    .mutation(async ({
        ctx, 
        input
    }) => {
        // const root = await ctx.prisma.projectRootRoot.findFirstOrThrow({
        //     where: {
        //         id: projectRootId,
        //     }
        // })

        return ctx.prisma.profile.create({
            data: {
                ...input,
                
            }
        })
    })
});

export default profileRouter
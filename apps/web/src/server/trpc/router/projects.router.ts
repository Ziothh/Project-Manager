import { Project } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {projects} from "@workspace/core"
import { resolve } from "path";
import { z } from "zod";
import { PROJECT_VALIDATORS } from "~/shared/validators";

import { router, publicProcedure } from "../trpc";

const projectRouter = router({
    // Queries
    getAll: publicProcedure
    .input(PROJECT_VALIDATORS.getAll())
    .query(async ({ ctx, input }) => {
        if (!input.projectRootId) throw new TRPCError({
            code: "METHOD_NOT_SUPPORTED",
            message: "`projectRootId: undefined` not implemented"
        })
        
        const projectRoot = await ctx.prisma.projectRoot.findFirstOrThrow({
            where: {
                id: input.projectRootId
            }
        })

        // // TODO
        // // return projects.listProjects("/Users/digitalastronaut/Websites/websites")
        return (await projects.listProjects(projectRoot.absolutePath))
            .map((p, i) => ({
                id: `Project ${i}`,
                absolutePath: p.paths.absolute,
                relativePath: p.paths.relative,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                isFavorited: false,
                name: p.name,
                type: (p.type ?? null) as string | null,
                projectRootId: input.projectRootId ?? "NOT QUERIED IN ROUTER",
            }))

        return []
    }),
    getOne: publicProcedure
    .input(PROJECT_VALIDATORS.getOne())
    .query(({
        input,
        ctx
    }) => {
        return ctx.prisma.project.findFirst({where: input})
    }),

    // Mutations
    create: publicProcedure
    .input(PROJECT_VALIDATORS.create())
    .mutation(async ({
        ctx, 
        input: {projectRootId, ...input}
    }) => {
        const root = await ctx.prisma.projectRoot.findFirstOrThrow({
            where: {
                id: projectRootId,
            }
        })

        return ctx.prisma.project.create({
            data: {
                ...input,
                absolutePath: resolve(root.absolutePath, input.relativePath),
                projectRoot: {
                    connect: {id: projectRootId}
                },
            }
        })
    })
});

export default projectRouter
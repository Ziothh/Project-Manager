import { Project } from "@prisma/client";
import { z, ZodString } from "zod";
import { PROJECT_ROOT_VALIDATORS } from "./projectRoot.validators";
import { ProjectType } from "../types/models";

type TProjectZodBlueprint = {[key in keyof Partial<Project>]: z.ZodType<any, any>}

import { id, name, createdAt, updatedAt, path } from "./common.validators";

export const base = {
    id,
    name,
    isFavorited: z.boolean,
    type: () => z.enum([Object.values(ProjectType)] as unknown as [ProjectType, ...ProjectType[]]),
    absolutePath: path,
    relativePath: path,
    createdAt,
    updatedAt,
}

export const getOne = () => z.object({
    id: base.id(),
})

export const getAll = () => z.object({
    projectRootId: PROJECT_ROOT_VALIDATORS.base.id().optional(),
} satisfies TProjectZodBlueprint)

export const create = () => z.object({
    name: base.name(),
    relativePath: base.relativePath(),
    projectRootId: PROJECT_ROOT_VALIDATORS.base.id(),
    type: base.type(),
} satisfies TProjectZodBlueprint)


export const PROJECT_VALIDATORS = {
    base,
    getAll,
    getOne,
    create,
}

import { ProjectRoot } from "@prisma/client";
import { z } from "zod";
// import { PROFILE_VALIDATORS } from ".";



import { createdAt, id, name, path, updatedAt } from "./common.validators";
import { PROFILE_VALIDATORS } from "./profile.validators";

export const base = {
    id,
    name,
    absolutePath: path,
    isFavorited: z.boolean,
    profileId: PROFILE_VALIDATORS.base.id,
    createdAt,
    updatedAt,
}

export const getAll = () => z.object({
    profileId: base.profileId(),
})

export const getOne = () => z.object({
    id: base.id(),
})

export const create = () => z.object({
    name: base.name(),
    absolutePath: base.absolutePath(),
    profileId: base.profileId(),
} satisfies {[key in keyof Partial<ProjectRoot>]: any})

export const PROJECT_ROOT_VALIDATORS = {
    base,
    getAll,
    getOne,
    create,
}

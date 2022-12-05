// import { Project } from "@prisma/client";
import { Profile, Project } from "@prisma/client";
import { z } from "zod";

import { id, name, createdAt, updatedAt, path } from "./common.validators";

export const base = {
    id,
    name,
    // absolutePath: path,
    createdAt,
    updatedAt,
}

export const getAll = () => z.object({

}).optional()

export const getOne = () => z.object({
    id: base.id(),
})

export const create = () => z.object({
    name: base.name(),
    // absolutePath: base.absolutePath(),
} satisfies {[key in keyof Partial<Profile>]: any})


export const PROFILE_VALIDATORS = {
    base,
    getAll,
    getOne,
    create,
}

import PROJECT_TYPE_GETTERS from "@config/projectTypeGetters"
import type { Dirent } from "fs"

export type ProjectType = keyof typeof PROJECT_TYPE_GETTERS

export interface Project {
    name: string
    paths: {
        absolute: string
        relative: string
    },
    tags: string[]
    type: ProjectType | undefined
    dirList: Dirent[]
}

export type ProjectList = Project[]
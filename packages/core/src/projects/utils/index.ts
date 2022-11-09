import PROJECT_TYPE_GETTERS from "@config/projectTypeGetters";
import type { Project, ProjectType } from "../types";

export const getProjectType = (projectDirList: Project["dirList"]): Project["type"] => {
    const typeGetterTuples = Object.entries(PROJECT_TYPE_GETTERS)
    for (let index = 0; index < typeGetterTuples.length; index++) {
        const [type, getter] = typeGetterTuples[index];
        
        if (getter(projectDirList)) {
            return type as ProjectType
        }
    }

    return undefined
}
import type { Project, ProjectList } from "./types"
import { readdir } from "fs/promises"
import EXCLUDED_FOLDERS from "@config/excludedFolders"
import { Dirent } from "fs"
import { resolve } from "path"
import { dir } from "console"
import { getProjectType } from "./utils"

// type ProjectMap = {[]}

// const readParsedDir = async (path: string) => filterExludedFilesFromDir(await readDir(path))

const readDir = async (path: string) => await readdir(path, {
    withFileTypes: true,
})

const dirIsProject = (dir: Dirent[]) => {
    return dir.find(d => d.isDirectory() && d.name === ".git") !== undefined
}

// const filterExludedFilesFromDir = (dirList: Dirent[]) => dirList.filter(d => d.isDirectory() || !EXCLUDED_FILES.has(d.name)) 
const isValidDir = (dirent: Dirent) => dirent.isDirectory() && !EXCLUDED_FOLDERS.has(dirent.name)


const parseDir = async (basePath: string, projectList: ProjectList, sections: string[] = []) => {
    const dirPath = resolve(basePath, ...sections)
    
    // console.log(`Parsing dir: ${dirPath}`);
    const dirList = await readDir(resolve(basePath, dirPath))

    const dirName = sections[sections.length - 1]

    // TODO: make this faster by not doing this on every recursion

    if (dirIsProject(dirList)) {
        projectList.push({
            name: dirName,
            paths: {
                absolute: dirPath,
                relative: `./${sections.join("/")}`,
            },
            tags: sections.slice(0, -1),
            type: getProjectType(dirList),
            dirList,
        })

        return
    }

    const promises: Promise<any>[] = []

    for (let index = 0; index < dirList.length; index++) {
        const directory = dirList[index];
        
        if (!isValidDir(directory)) continue

        // const absDirectoryPath = resolve(basePath, ...sections, directory.name)

        // console.log(`Reading: ${absDirectoryPath}`);
        // if (dirIsProject(await readDir(absDirectoryPath))) {
        //     projectList.push({
        //         name: directory.name,
        //         paths: {
        //             absolute: absDirectoryPath,
        //             relative: directory.name, // TODO: doesn't work with recursion
        //         },
        //         type: "TODO"
        //     })

        //     continue
        // }

        promises.push(parseDir(basePath, projectList, [...sections, directory.name]))
    }

    return await Promise.all(promises)
}

/**
 * - Reads the projects dir
 * - Then loops over every folder in the dir. (~ ignore files)
 *   - If: that folder contains a .git folder it is a project
 *   - Else: if it has subfolders: loop again
*/
const readProjects = async (projectsDir: string) => {

    // const projects: {[name: string]: {
    //     path: string,
    // }} = {}
    const projects: ProjectList = []
    
    // ;(await readDir(projectsDir)).forEach(subDir => parseDir(resolve(projectsDir, subDir.name), projects))
    await parseDir(projectsDir, projects)
    // ;(await readParsedDir(projectsDir)).forEach(d => {
    // })

    return projects
}

export const listProjects = async (projectsDir: string) => {
    const rootProjects = await readProjects(projectsDir)

    // rootProjects.map(p => p.)
    return rootProjects
}
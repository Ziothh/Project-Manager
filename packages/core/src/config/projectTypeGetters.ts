import type { Project } from "src/projects/types"


const WP_DIRS = new Set(["wp-content", "wp-config.php",])
const NEXT_DIRS = new Set(["next.config.js", "next.config.ts"])
const CRAFT_DIRS = new Set(["craft"])

const PROJECT_TYPE_GETTERS = {
    "Wordpress": (dirList) => {
        return dirList.find(dir => WP_DIRS.has(dir.name)) !== undefined
    },
    "NextJS": (dirList) => {
        return dirList.find(dir => NEXT_DIRS.has(dir.name)) !== undefined
    },
    "Craft": (dirList) => {
        return dirList.find(dir => CRAFT_DIRS.has(dir.name)) !== undefined
    }
} satisfies {[type: string]: (projectDirList: Project["dirList"]) => boolean}

export default PROJECT_TYPE_GETTERS
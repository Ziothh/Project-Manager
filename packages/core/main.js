// @ts-check

import { writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {projects} from "./dist"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
    console.log("Parsing started...");
    const foundProjects = await projects.listProjects("/Users/digitalastronaut/Websites/websites")
    console.log("Found projects: ", foundProjects)
    console.log("Parsing ended...");

    await writeFile(resolve(__dirname, "projects.json"), JSON.stringify(foundProjects, null, 4))
}

main()
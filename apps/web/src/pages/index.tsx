import Head from "next/head";
import { useEffect, useState } from "react";
import type {Project} from "@workspace/core/dist/projects/types"

export default function Web() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        window.projects.listProjects("/Users/digitalastronaut/Websites/websites")
        .then(foundProjects => {
            setProjects(foundProjects)
        })
    }, [])

    return (
        <div className="text-gray-100 bg-gray-900 max-w-screen max-h-screen overflow-y-auto overflow-x-hidden">
            <div className=" w-screen h-screen flex flex-col p-4">
                <h1 className="text-4xl font-bold text-center">
                Yerba: An Electron Monorepo Demo
                </h1>
                <div>
                    <div className="text-2xl font-semibold">Projects: </div>
                    <ul>
                        {projects.map(p => (
                            <li key={p.name}>
                                <pre>
                                    {JSON.stringify(p, null, 4)}
                                </pre>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

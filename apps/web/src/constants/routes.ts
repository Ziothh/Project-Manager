import { Profile } from "@prisma/client"

// const createRoute = (path: string, slug: number | string) => 
const optionalParam = (param?: string | number | null) => param ? `/${param}` : ""

const PROFILE_ROUTES = (id: Profile["id"]) => `/profiles${optionalParam(id)}`

const ROUTES = {
    home: "/",
    profile: PROFILE_ROUTES,
    NOT_IMPLEMENTED: "/#URL-NOT-IMPLEMENTED"
} as const

export default ROUTES
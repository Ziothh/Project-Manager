import { z } from "zod";

export const id = z.string
export const name = z.string
export const createdAt = z.date
export const updatedAt = z.date
export const path = z.string

export const COMMON_VALIDATORS = {
    id,
    name,
    createdAt,
    updatedAt,
    path,
}

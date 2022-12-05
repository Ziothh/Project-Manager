import { contextFactory } from "@ziothh/react-hooks";
import { useSearchParams } from "next/navigation";
import { useAppCtx } from "~/features/global";

export const [ProfileContext, useProfileCtx] = contextFactory(() => {
    const p = useSearchParams()
    const {currentProfile} = useAppCtx()

    return {
        currentProfile: currentProfile!
    }
})
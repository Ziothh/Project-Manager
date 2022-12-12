export const wrapPromise = <T>(promise: Promise<T>) => {
    let status: "pending" | "success" | "error" = "pending";
    let result: T;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        }, 
        e => {
            status = "error";
            result = e
        }
    )

    return {
        read() {
            if (status === "pending") {
                throw suspender
            } else if (status === "error") {
                throw result
            }

            return result
        }
    }
}
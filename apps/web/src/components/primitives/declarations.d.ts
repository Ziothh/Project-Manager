import type { FC } from "react"

declare module '*.svg' {
	// const ReactComponent: React.ReactComponent;
	// export { ReactComponent };

    export default FC<{className?: string}>
}

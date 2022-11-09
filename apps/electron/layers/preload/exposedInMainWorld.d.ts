interface Window {
    readonly yerba: { version: number; };
    /**
     * Safe expose node.js API
     * @example
     * window.nodeCrypto('data')
     */
    readonly nodeCrypto: { sha256sum: any; };
    readonly projects: typeof import("/Users/digitalastronaut/Projects/private/Project-Manager/packages/core/dist/projects/index");
}

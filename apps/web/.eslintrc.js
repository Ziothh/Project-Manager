module.exports = {
    parser: "@typescript-eslint/parser",
    settings: {
        next: {
            rootDir: ["apps/*/", "packages/*/"],
        },
    },
    parserOptions: {
        "project": "./tsconfig.json"
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "next/babel", 
        "prettier",
        "next/core-web-vitals", 
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "@typescript-eslint/consistent-type-imports": "warn",
        "@next/next/no-html-link-for-pages": "off",
        "react/display-name": "off",
        "react/jsx-no-undef": "off"
    }
}

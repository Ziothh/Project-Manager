const _EXCLUDED_FOLDER_LIST: string[] = [
    // ".DS_Store",
    "wp-content",
    "wp-includes",
    "wp-admin",
]

const EXCLUDED_FOLDERS = new Set(_EXCLUDED_FOLDER_LIST)

export default EXCLUDED_FOLDERS
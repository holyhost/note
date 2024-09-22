
export function getDomain() {
    return process.env.PUBLIC_APP_URL || "http://localhost:3000"
}

export function getFileDomain() {
    const folder = process.env.FILE_UPLOAD_FOLDER || 'files'
    return (process.env.PUBLIC_APP_URL || "http://localhost:3000") + "/" + folder
}


export interface BaseType {
    label: string,
    value: number
}
export const FILE_DISPLAY_TYPES = [
    {
        label: '居中',
        value: 'center'
    },
    {
        label: '靠左',
        value: 'start'
    },
    {
        label: '靠右',
        value: 'end'
    },
    {
        label: '一行',
        value: 'inline'
    },
]

export const NOTE_TAGS: string[] = ['Error', 'React', 'Vue', 'Angular', 'Python', 'Nextjs']

export const NOTE_TYPES: BaseType[] = [
    {
        label: '公开',
        value: 1
    },
    {
        label: '仅自己可见',
        value: 11
    },
]
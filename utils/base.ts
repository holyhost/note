
export function getDomain() {
    return process.env.PUBLIC_APP_URL || "http://localhost:3000"
}


export interface BaseType {
    label: string,
    value: number
}

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
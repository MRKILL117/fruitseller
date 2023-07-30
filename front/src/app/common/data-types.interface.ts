export interface filter {
    type: 'text' | 'datepicker' | 'select',
    placeholder?: string,
    value?: string,
    name: string,
    config?: selectConfig | null
}

interface selectConfig {
    options: Array<any>,
    multiple: boolean | false
}
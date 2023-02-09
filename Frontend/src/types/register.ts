export interface RegisterInfo {
    userName: string
    password: string
    image: string | undefined
}

export interface ConfirmPassword {
    alert: boolean
    value: string
}

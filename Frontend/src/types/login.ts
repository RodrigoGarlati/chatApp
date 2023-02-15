import { RegisterInfo } from "./register"

export type LoginInfo = Omit<RegisterInfo, 'image'>
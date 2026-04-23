import { User } from "./user"

export type LoginRequest = {
  login: string
  password: string
}

export type AuthResponse = {
  access_token?: string
  user?: User
  message?: string
}

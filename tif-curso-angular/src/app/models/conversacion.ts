import { Mensaje } from "./mensaje"

export interface Conversacion {
    numeroCel: string,
    mensajes: Mensaje[]
}
import { HttpRequest } from "../http/request";

export const infoLog = (req: HttpRequest, log: string) => console.log(`INFO[${req.id}]: ${log}`)

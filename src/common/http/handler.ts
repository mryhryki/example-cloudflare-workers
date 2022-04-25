import { HttpRequest } from "./request";

export type HttpHandler = (request: HttpRequest) => Promise<Response | null>;

type Method = "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
type Handler = (request: HttpRequest) => Promise<Response>;

export const wrapSimpleMatchHandler =
  (method: Method, pathname: string, handler: Handler): HttpHandler =>
  (request: HttpRequest) => {
    const url = new URL(request.url);
    if (request.method === method && url.pathname === pathname) {
      return handler(request);
    }
    return Promise.resolve(null);
  };

type Matcher = (request: HttpRequest) => Promise<boolean>;
export const wrapComplexMatchHandler =
  (matcher: Matcher, handler: Handler): HttpHandler =>
  (request: HttpRequest) => {
    return matcher(request).then((match) => {
      if (match) {
        return handler(request);
      } else {
        return null;
      }
    });
  };

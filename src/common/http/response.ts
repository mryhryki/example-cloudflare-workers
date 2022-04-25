import { HttpRequest } from "./request";

export const getSuccessHtmlResponse = (request: HttpRequest, html: string): Response => {
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Request-Id": request.id,
    },
  });
};

export const getSuccessJsonResponse = (request: HttpRequest, data: unknown): Response => {
  return new Response(JSON.stringify({ success: true, data }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Request-Id": request.id,
    },
  });
};

export const getErrorJsonResponse = (request: HttpRequest, status: number, message: string): Response =>
  new Response(JSON.stringify({ success: false, error: { message } }, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Request-Id": request.id,
    },
  });

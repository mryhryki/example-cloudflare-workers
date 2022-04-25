import { HttpRequest } from "./request";

export const getSuccessJsonResponse = (req: HttpRequest, data: unknown): Response => {
  return new Response(JSON.stringify({ success: true, data }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Request-Id": req.id,
    },
  });
};

export const getErrorJsonResponse = (req: HttpRequest, status: number, message: string): Response =>
  new Response(JSON.stringify({ success: false, error: { message } }, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Request-Id": req.id,
    },
  });

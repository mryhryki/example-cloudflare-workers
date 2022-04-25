import { convertToHttpRequest } from "../common/http/request";
import { infoLog } from "../common/util/logger";
import { getErrorJsonResponse } from "../common/http/response";
import { HttpHandler } from "../common/http/handler";
import { apiHealthGet } from "./api/health/get";
import { pageHandler } from "./page";

const Handlers: HttpHandler[] = [pageHandler, apiHealthGet];

export const handleFetchRequest = async (req: Request): Promise<Response> => {
  const request = convertToHttpRequest(req);
  infoLog(request, `${request.method} ${request.urlObj.pathname}`);
  try {
    for await (const handler of Handlers) {
      const response = await handler(request);
      if (response != null) {
        return response;
      }
    }
    return getErrorJsonResponse(request, 404, "Not Found");
  } catch (err) {
    const message: string = err instanceof Error ? err.message : JSON.stringify(err);
    return getErrorJsonResponse(request, 500, `Internal Server Error: ${message}`);
  }
};

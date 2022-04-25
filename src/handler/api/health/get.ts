import { DateTime } from "@mryhryki/datetime";
import { HttpHandler, wrapSimpleMatchHandler } from "../../../common/http/handler";
import { getSuccessJsonResponse } from "../../../common/http/response";

export const apiHealthGet: HttpHandler = wrapSimpleMatchHandler("GET", "/api/health", (request) =>
  Promise.resolve(
    getSuccessJsonResponse(request, {
      id: request.id,
      time: DateTime.now().toISO(),
    })
  )
);

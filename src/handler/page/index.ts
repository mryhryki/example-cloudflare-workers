import { ComplexMatcher, wrapComplexMatchHandler } from "../../common/http/handler";
import { getErrorJsonResponse, getSuccessHtmlResponse } from "../../common/http/response";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkHtml from "./html/link.html";

const PathPattern = new RegExp("^/page/([a-z0-9_-]+)$");
const matcher: ComplexMatcher = (request) => Promise.resolve(PathPattern.test(request.urlObj.pathname));

export const pageHandler = wrapComplexMatchHandler(matcher, async (request) => {
  const pageId: string = (request.urlObj.pathname.match(PathPattern) ?? ["", "(empty)"])[1];
  console.debug(pageId);
  switch (pageId) {
    case "link":
      return getSuccessHtmlResponse(request, LinkHtml);
    default:
      return getErrorJsonResponse(request, 404, `${pageId} page not found`);
  }
});

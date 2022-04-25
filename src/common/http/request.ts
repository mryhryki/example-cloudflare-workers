import { getRandom } from "../util/random";

export interface HttpRequest extends Request {
  id: string;
  urlObj: URL;
}

export const convertToHttpRequest = (req: Request): HttpRequest => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const httpRequest: any = req;
  httpRequest.id = getRandom(22);
  httpRequest.urlObj = new URL(req.url);
  return httpRequest;
};

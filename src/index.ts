import { handleFetchRequest } from "./handler";

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleFetchRequest(event.request));
});

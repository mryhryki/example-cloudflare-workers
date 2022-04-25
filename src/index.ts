addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const handleRequest = async (request: Request): Promise<Response> => {
  return new Response("Hello, TypeScript!");
};
